package ru.mypoint.webserver.domains.front

import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.*
import io.ktor.client.features.json.*
import io.ktor.client.request.*
import io.ktor.html.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.*
import ru.mypoint.webserver.common.DbUrls
import ru.mypoint.webserver.common.dto.*
import ru.mypoint.webserver.domains.front.templates.components.collections.buttons.ButtonsAdminUsersControlPanel
import ru.mypoint.webserver.domains.front.templates.components.collections.buttons.ButtonsForgotAdminPage
import ru.mypoint.webserver.domains.front.templates.components.collections.buttons.ButtonsLoginAdminPage
import ru.mypoint.webserver.domains.front.templates.components.collections.buttons.ButtonsResetPasswordAdminPage
import ru.mypoint.webserver.domains.front.templates.components.controlPanel
import ru.mypoint.webserver.domains.front.templates.components.dataTable
import ru.mypoint.webserver.domains.front.templates.layouts.AdminPanelDefaultLayout
import ru.mypoint.webserver.domains.front.templates.layouts.AdminPanelMainLayout
import ru.mypoint.webserver.domains.front.templates.pages.*

@Suppress("unused") // Referenced in application.conf
fun Application.adminModule() {
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
        route("/admin/panel") {
            get {
                val token = GetAuth(call).token()

                val result = client.checkAccess<String>(
                    CheckAccessDTO(
                        url = "/admin/panel",
                        token = token,
                        body = null
                    ),
                    call
                )

                /** Главная страница */
                if (result != null) {
                    call.respondHtmlTemplate(AdminPanelMainLayout(), HttpStatusCode.OK) {
                        page = adminHomePage {

                        }
                        styleUrl = listOf("/static/admin-home.css")
                    }
                }
                else {
                    call.respondRedirect("/admin/panel/login", false)
                }
            }

            get("/login") {
                call.respondHtmlTemplate(AdminPanelDefaultLayout(), HttpStatusCode.OK) {
                    page = loginPage {
                        buttons = ButtonsLoginAdminPage()
                    }
                    styleUrl = listOf("/static/form-login.css")
                }
            }

            get("/forgot/password") {
                call.respondHtmlTemplate(AdminPanelDefaultLayout(), HttpStatusCode.OK) {
                    page = forgotPage {
                        buttons = ButtonsForgotAdminPage()
                    }
                    styleUrl = listOf("/static/form-login.css")
                }
            }

            get("/reset/password/{code}") {
                call.respondHtmlTemplate(AdminPanelDefaultLayout(), HttpStatusCode.OK) {
                    page = resetPasswordPage {
                        buttons = ButtonsResetPasswordAdminPage()
                    }
                    styleUrl = listOf("/static/form-login.css")
                }
            }

//            get("/email/test") {
//                /** Нагрузочное тестирование */
//                for (i in 1..10) {
//                    for(idx in 1..5) {
//                        client.sendNotification<String>(
//                            SendNotificationDTO(
//                                TypeNotification.EMAIL,
//                                setOf("sagit117+${idx.toString()}@gmail.com"),
//                                "RESETPASSWORD",
//                                randomCode(10)
//                            ),
//                            call
//                        )
//                    }
//                }
//
//                call.respond(HttpStatusCode.OK, mapOf("status" to "OK"))
//            }
        }

        route("/admin") {
            get("/users") {
                val token = GetAuth(call).token()

                val result = client.checkAccess<String>(
                    CheckAccessDTO(
                        url = "/admin/users",
                        token = token,
                        body = null
                    ),
                    call
                )

                /** Страница управления пользователями */
                if (result != null) {
                    /** Получить список пользователей */
                    val users = client.post<String>(
                        RequestToDataBus(
                            dbUrl = DbUrls.UsersGetAll.value,
                            method = MethodsRequest.POST,
                            authToken = token,
                            body = GetListWithLimit(50, 0)
                        ),
                        call
                    )

                    println(users.toString())

                    call.respondHtmlTemplate(AdminPanelMainLayout(), HttpStatusCode.OK) {
                        page = adminUsersPage {
                            usersControlPanel = controlPanel {
                                buttons = ButtonsAdminUsersControlPanel()
                                usersTable = dataTable {

                                }
                            }
                        }
                        styleUrl = listOf("/static/admin-users.css")
                    }
                }
                else {
                    call.respondRedirect("/admin/panel/login", false)
                }
            }
        }
    }
}