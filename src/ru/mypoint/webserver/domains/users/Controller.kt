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
import ru.mypoint.webserver.common.dto.*
import ru.mypoint.webserver.common.randomCode
import ru.mypoint.webserver.domains.notification.DataForQueueResetPassword
import ru.mypoint.webserver.domains.notification.QueueResetPassword
import ru.mypoint.webserver.domains.notification.dto.SendNotificationDTO
import ru.mypoint.webserver.domains.notification.dto.TypeNotification
import ru.mypoint.webserver.domains.users.dto.*

@Suppress("unused") // Referenced in application.conf
fun Application.userModule() {
    /** настройки по умолчанию для запроса как клиент */
    val client = createDataBusClient {
        logger = log
        httpClient = HttpClient(CIO) {
            defaultRequest { // this: HttpRequestBuilder ->
                try {
                    host = environment.config.propertyOrNull("databus.host")?.getString() ?: "127.0.0.1"
                    port = environment.config.propertyOrNull("databus.port")?.getString()?.toInt() ?: 8080
                } catch (error: Exception) {
                    log.error(error)
                    host = "127.0.0.1"
                    port = 8080
                }
            }

            install(JsonFeature) {
                serializer = GsonSerializer()
            }
        }
    }

    routing {
        route("/v1/users") {
            post("/registry") {
                val userRegistryDTO = call.receive<UserRegistryDTO>()

                val result = client.post<Any>(
                    RequestToDataBus(
                        dbUrl = "/v1/users/add",
                        method = MethodsRequest.POST,
                        authToken = null,
                        body = userRegistryDTO
                    ),
                    call
                )

                if (result != null) {
                    call.respond(HttpStatusCode.OK)

                    val templateName = environment.config.propertyOrNull("notificationTemplateName.afterRegistry")?.getString() ?: ""

                    client.sendNotification<String>(
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
                val userLoginDTO = call.receive<UserLoginDTO>()

                val result = client.login<UserReceiveLoginDTO>(
                    userLoginDTO,
                    call
                )

                if (result != null) {
//                    println("session set: ${result.token}")
                    call.sessions.set(UserSession(result.token))
                    call.respond(HttpStatusCode.OK, result)

                    val templateName = environment.config.propertyOrNull("notificationTemplateName.afterLogin")?.getString() ?: ""

                    client.sendNotification<String>(
                        SendNotificationDTO(
                            TypeNotification.EMAIL,
                            setOf(userLoginDTO.email),
                            templateName
                        ),
                        call
                    )

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

                val result = client.post<String>(
                    RequestToDataBus(
                        dbUrl = "/v1/users/get",
                        method = MethodsRequest.POST,
                        authToken = token,
                        body = UserGetDTO(emailDTO.email)
                    ),
                    call
                )

                if (result != null) call.respond(HttpStatusCode.OK, result)
            }

            get("/reset/password/{email}") {
                val emailDTO = try {
                    EmailDTO(call.parameters["email"].toString())
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

                /** Формирование объекта нотификации */
                val sendNotificationDTO = SendNotificationDTO(
                    TypeNotification.EMAIL,
                    setOf(emailDTO.email),
                    templateName,
                    payloads = resetPasswordPayload + hash
                )

                /** Сохранить в оперативку объект, для которого был запрошен сброс пароля */
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

                val result = client.sendNotification<String>(
                    sendNotificationDTO,
                    call
                )

                if (result != null) {
                    // ответ
                    call.respond(HttpStatusCode.OK, result)
                }
            }

            route("/update") {
                route("/password") {
                    /**
                     * Изменение пароля возможно только с подходящей ролью
                     * и правильным вводом старого пароля
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

                        /** логин */
                        val login = client.login<String>(
                            UserLoginDTO(emailDTO.email, updateData.oldPassword ?: ""),
                            call
                        )

                        if (login != null) {
                            val result = client.post<String>(
                                RequestToDataBus(
                                    dbUrl = "/v1/users/update/password",
                                    method = MethodsRequest.POST,
                                    authToken = token,
                                    body = UserUpdatePasswordDTO(emailDTO.email, updateData.newPassword)
                                ),
                                call
                            )

                            if (result != null) call.respond(HttpStatusCode.OK, result)
                        }
                    }

                    post("/hash/{hash}") {
                        val hash = call.parameters["hash"].toString()
                        val email = QueueResetPassword.getWithHash(hash)?.emailDTO?.email
                        val techLogin = environment.config.propertyOrNull("databus.login")?.getString() ?: ""
                        val techPassword = environment.config.propertyOrNull("databus.password")?.getString() ?: ""
                        val newPasswordDTO = call.receive<UserRecoveryPasswordDTO>()

                        if (email == null) {
                            return@post call.respond(HttpStatusCode.BadRequest, mapOf("status" to "Bad Request"))
                        }

                        val token = client.login<UserReceiveLoginDTO>(
                            UserLoginDTO(techLogin, techPassword),
                            call
                        )?.token

                        println("tech token: $token")

                        if (token != null) {
                            val result = client.post<String>(
                                RequestToDataBus(
                                    dbUrl = "/v1/users/update/password",
                                    method = MethodsRequest.POST,
                                    authToken = token,
                                    body = UserUpdatePasswordDTO(
                                        email = email,
                                        newPassword = newPasswordDTO.newPassword
                                    )
                                ),
                                call
                            )

                            if (result != null) call.respond(HttpStatusCode.OK, mapOf("status" to "OK"))
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

                    val result = client.post<String>(
                        RequestToDataBus(
                            dbUrl = "/v1/users/update/data",
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