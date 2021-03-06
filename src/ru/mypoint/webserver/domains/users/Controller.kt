package ru.mypoint.webserver.domains.users

import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.*
import io.ktor.client.features.json.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*
import io.ktor.util.*
import ru.mypoint.webserver.KeyAttributesForCall
import ru.mypoint.webserver.common.DbUrls
import ru.mypoint.webserver.common.dto.*
import ru.mypoint.webserver.common.randomCode
import ru.mypoint.webserver.domains.notification.DataForQueueResetPassword
import ru.mypoint.webserver.domains.notification.QueueResetPassword
import ru.mypoint.webserver.domains.notification.dto.SendNotificationDTO
import ru.mypoint.webserver.domains.notification.dto.TypeNotification
import ru.mypoint.webserver.domains.users.dto.*

@Suppress("unused") // Referenced in application.conf
fun Application.userModule() {
    routing {
        route("/v1/users") {
            post("/registry") {
                val userRegistryDTO = call.receive<UserRegistryDTO>()

                val result = call.attributes[KeyAttributesForCall.keyDataBusClient].post<Any>(
                    RequestToDataBus(
                        dbUrl = DbUrls.UsersAdd.value,
                        method = MethodsRequest.POST,
                        authToken = null,
                        body = userRegistryDTO
                    ),
                    call
                )

                if (result != null) {
                    call.respond(HttpStatusCode.OK)

                    val templateName = environment.config.propertyOrNull("notificationTemplateName.afterRegistry")?.getString() ?: ""

                    call.attributes[KeyAttributesForCall.keyDataBusClient].sendNotification<String>(
                        SendNotificationDTO(
                            TypeNotification.EMAIL,
                            setOf(userRegistryDTO.email),
                            templateName
                        ),
                        call
                    )
                }
            }

            post("/login") {
                var isApiMode = true // ?????????????????? ???????? ?????? ???? ???????????? ???????????? ?????????? API ?????? ?????????? ??????????

                val userLoginDTO =
                    if (call.request.headers["Content-Type"] == "application/x-www-form-urlencoded") {
                        /** ???????? ???????????? ???????????????? ???? ?????????? */
                        val parameters = call.receiveParameters()
                        isApiMode = false
                        UserLoginDTO(email = parameters["email"].toString(), password = parameters["password"].toString())
                    } else {
                        call.receive<UserLoginDTO>()
                    }

                val result = call.attributes[KeyAttributesForCall.keyDataBusClient].login<UserReceiveLoginDTO>(
                    userLoginDTO,
                    call
                )

                if (result != null) {
                    val templateName = environment.config.propertyOrNull("notificationTemplateName.afterLogin")?.getString() ?: ""

                    call.attributes[KeyAttributesForCall.keyDataBusClient].sendNotification<String>(
                        SendNotificationDTO(
                            TypeNotification.EMAIL,
                            setOf(userLoginDTO.email),
                            templateName
                        ),
                        call
                    )

                    /** ?????????? */
                    call.sessions.set(UserSession(result.token))

                    if (isApiMode) {
                        return@post call.respond(HttpStatusCode.OK, result)
                    } else {
                        return@post call.respondRedirect("/admin/panel", false)
                    }
                }
            }

            get("/{email}") {
                val emailDTO = try {
                    EmailDTO(call.parameters["email"].toString())
                } catch (error: Throwable) {
                    log.error(error.localizedMessage)
                    return@get call.respond(
                        HttpStatusCode.BadRequest,
                        ResponseStatusDTO(ResponseStatus.BadRequest.value)
                    )
                }

                val token = GetAuth(call).token()

                val result = call.attributes[KeyAttributesForCall.keyDataBusClient].post<String>(
                    RequestToDataBus(
                        dbUrl = DbUrls.UserGet.value,
                        method = MethodsRequest.POST,
                        authToken = token,
                        body = UserGetDTO(email = emailDTO.email, id = null)
                    ),
                    call
                )

                if (result != null) call.respond(HttpStatusCode.OK, result)
            }

            get("/reset/password/{email?}") {
                val isApiMode = call.request.queryParameters["email"] == null

                val emailDTO = try {
                    EmailDTO(email = call.parameters["email"].toString())
                } catch (error: Throwable) {
                    log.error(error.localizedMessage)
                    return@get call.respond(
                        HttpStatusCode.BadRequest,
                        ResponseStatusDTO(ResponseStatus.BadRequest.value)
                    )
                }

                val templateName = environment.config.propertyOrNull("notificationTemplateName.afterResetPassword")?.getString() ?: ""
                val resetPasswordPayload = environment.config.propertyOrNull("notificationTemplateName.resetPasswordPayload")?.getString() ?: ""
                val hash = randomCode(10)

                /** ???????????????????????? ?????????????? ?????????????????????? */
                val sendNotificationDTO = SendNotificationDTO(
                    TypeNotification.EMAIL,
                    setOf(emailDTO.email),
                    templateName,
                    payloads = resetPasswordPayload + hash
                )

                /** ?????????????????? ?? ???????????????????? ????????????, ?????? ???????????????? ?????? ???????????????? ?????????? ???????????? */
                val expiredMS = environment.config.propertyOrNull("application.queueResetPassword.expiredMS")?.getString()
                val intervalAddMC = environment.config.propertyOrNull("application.queueResetPassword.intervalAddMC")?.getString()

                if (!QueueResetPassword.addItemQueue(
                    DataForQueueResetPassword(
                        emailDTO = emailDTO,
                        sendNotificationDTO = sendNotificationDTO,
                        hash = hash,
                        expiredMS = expiredMS?.toLong() ?: 3_600_000L,
                        intervalAddMC = intervalAddMC?.toLong() ?: 120_000L
                    )
                )) {
                    return@get call.respond(HttpStatusCode.TooManyRequests, ResponseStatusDTO(ResponseStatus.TooManyRequests.value))
                }

                val result = call.attributes[KeyAttributesForCall.keyDataBusClient].sendNotification<String>(
                    sendNotificationDTO,
                    call
                )

                if (result != null) {
                    // ??????????
                    if (isApiMode) {
                        call.respond(HttpStatusCode.OK, result)
                    } else {
                        call.respondRedirect("/admin/panel/login", false)
                    }
                }
            }

            route("/update") {
                route("/password") {
                    /**
                     * ?????????????????? ???????????? ???????????????? ???????????? ?? ???????????????????? ??????????
                     * ?? ???????????????????? ???????????? ?????????????? ????????????
                     */
                    post("/email/{email}") {
                        val emailDTO = try {
                            EmailDTO(call.parameters["email"].toString())
                        } catch (error: Throwable) {
                            log.error(error.localizedMessage)
                            return@post call.respond(
                                HttpStatusCode.BadRequest,
                                ResponseStatusDTO(ResponseStatus.BadRequest.value)
                            )
                        }

                        val updateData = call.receive<UserUpdatePasswordDTO>()
                        val token = GetAuth(call).token()

                        /** ?????????? */
                        val login = call.attributes[KeyAttributesForCall.keyDataBusClient].login<String>(
                            UserLoginDTO(emailDTO.email, updateData.oldPassword ?: ""),
                            call
                        )

                        if (login != null) {
                            val result = call.attributes[KeyAttributesForCall.keyDataBusClient].post<String>(
                                RequestToDataBus(
                                    dbUrl = DbUrls.UsersUpdatePassword.value,
                                    method = MethodsRequest.POST,
                                    authToken = token,
                                    body = UserUpdatePasswordDTO(emailDTO.email, updateData.newPassword)
                                ),
                                call
                            )

                            if (result != null) call.respond(HttpStatusCode.OK, result)
                        }
                    }

                    post("/hash/{hash?}") {
                        var isApiMode = true // ?????????????????? ???????? ?????? ???? ???????????? ???????????? ?????????? API ?????? ?????????? ??????????

                        var hash = call.parameters["hash"].toString()
                        val techLogin = environment.config.propertyOrNull("databus.login")?.getString() ?: ""
                        val techPassword = environment.config.propertyOrNull("databus.password")?.getString() ?: ""

                        val newPasswordDTO =
                            if (call.request.headers["Content-Type"] == "application/x-www-form-urlencoded") {
                                /** ???????? ???????????? ???????????????? ???? ?????????? */
                                val parameters = call.receiveParameters()
                                isApiMode = false
                                hash = parameters["hash"].toString()
                                UserRecoveryPasswordDTO(newPassword = parameters["newPassword"].toString())
                            } else {
                                call.receive<UserRecoveryPasswordDTO>()
                            }

                        val email = QueueResetPassword.getWithHash(hash)?.emailDTO?.email
                            ?: return@post call.respond(HttpStatusCode.BadRequest, mapOf("status" to "Bad Request"))

                        val token = call.attributes[KeyAttributesForCall.keyDataBusClient].login<UserReceiveLoginDTO>(
                            UserLoginDTO(techLogin, techPassword),
                            call
                        )?.token

                        println("tech token: $token")

                        if (token != null) {
                            val result = call.attributes[KeyAttributesForCall.keyDataBusClient].post<String>(
                                RequestToDataBus(
                                    dbUrl = DbUrls.UsersUpdatePassword.value,
                                    method = MethodsRequest.POST,
                                    authToken = token,
                                    body = UserUpdatePasswordDTO(
                                        email = email,
                                        newPassword = newPasswordDTO.newPassword
                                    )
                                ),
                                call
                            )

                            if (result != null) {
                                if (isApiMode) {
                                    call.respond(HttpStatusCode.OK, mapOf("status" to "OK"))
                                } else {
                                    call.respondRedirect("/admin/panel/login", false)
                                }
                            }
                        }
                    }
                }

                post("/data/{email}") {
                    val emailDTO = try {
                        EmailDTO(call.parameters["email"].toString())
                    } catch (error: Throwable) {
                        log.error(error.localizedMessage)
                        return@post call.respond(
                            HttpStatusCode.BadRequest,
                            ResponseStatusDTO(ResponseStatus.BadRequest.value)
                        )
                    }

                    val updateData = call.receive<UserUpdateDataDTO>()
                    val token = GetAuth(call).token()

                    val result = call.attributes[KeyAttributesForCall.keyDataBusClient].post<String>(
                        RequestToDataBus(
                            dbUrl = DbUrls.UserUpdateData.value,
                            method = MethodsRequest.POST,
                            authToken = token,
                            body = updateData.copy(email = emailDTO.email)
                        ),
                        call
                    )

                    if (result != null) call.respond(HttpStatusCode.OK, result)
                }
            }
        }
    }
}