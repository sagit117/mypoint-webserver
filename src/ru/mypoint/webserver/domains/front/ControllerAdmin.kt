package ru.mypoint.webserver.domains.front

import com.google.gson.Gson
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
import ru.mypoint.webserver.common.convertLongToTime
import ru.mypoint.webserver.common.dto.*
import ru.mypoint.webserver.domains.front.templates.components.auth.formForgot
import ru.mypoint.webserver.domains.front.templates.components.auth.formLogin
import ru.mypoint.webserver.domains.front.templates.components.auth.formResetPassword
import ru.mypoint.webserver.domains.front.templates.components.collections.buttons.*
import ru.mypoint.webserver.domains.front.templates.components.collections.template.table.AdminUserTableTemplate
import ru.mypoint.webserver.domains.front.templates.components.controlPanel
import ru.mypoint.webserver.domains.front.templates.components.dataTable
import ru.mypoint.webserver.domains.front.templates.layouts.AdminPanelDefaultLayout
import ru.mypoint.webserver.domains.front.templates.layouts.AdminPanelMainLayout
import ru.mypoint.webserver.domains.front.templates.pages.*
import ru.mypoint.webserver.domains.users.dto.UsersGetListForAdminTableUsersDTO
import kotlin.math.ceil

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
                serializer = GsonSerializer {

                }
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
                        formLogin = formLogin {
                            buttons = ButtonsLoginAdminPage()
                        }
                    }
                    styleUrl = listOf("/static/form-login.css")
                }
            }

            get("/forgot/password") {
                call.respondHtmlTemplate(AdminPanelDefaultLayout(), HttpStatusCode.OK) {
                    page = forgotPage {
                        formForgot = formForgot {
                            buttons = ButtonsForgotAdminPage()
                        }
                    }
                    styleUrl = listOf("/static/form-login.css")
                }
            }

            get("/reset/password/{code}") {
                call.respondHtmlTemplate(AdminPanelDefaultLayout(), HttpStatusCode.OK) {
                    page = resetPasswordPage {
                        formReset = formResetPassword {
                            buttons = ButtonsResetPasswordAdminPage()
                            code = call.parameters["code"].toString()
                        }
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
                    /** Получить настройки списка */
                    val limit = try {
                        call.request.queryParameters["limit"]?.toInt() ?: 50
                    } catch (_: Throwable) {
                        50
                    }
                    val pageNum = try {
                        call.request.queryParameters["pageNum"]?.toInt() ?: 1
                    } catch (_: Throwable) {
                        1
                    }

                    /** Получить список пользователей */
                    val users = client.post<String>(
                        RequestToDataBus(
                            dbUrl = DbUrls.UsersGetList.value,
                            method = MethodsRequest.POST,
                            authToken = token,
                            body = GetListWithLimit(limit, (pageNum - 1) * limit)
                        ),
                        call
                    )

                    /** Преобразование JSON в список объектов */
                    val gson = Gson()
                    val usersListJSON = gson.fromJson(users, UsersGetListForAdminTableUsersDTO::class.java)
                    val usersList = usersListJSON.users.map {
                        AdminUserTableTemplate(
                            _id = "<a href=\"/admin/panel/user/${it._id}\">${it._id}</a>",
                            email = it.email,
                            fullName = it.fullName,
                            zipCode = it.zipCode,
                            address = it.address,
                            isBlocked = if (it.isBlocked) "Да" else "Нет",
                            isNeedsPassword = it.isNeedsPassword.toString(),
                            isConfirmEmail = it.isConfirmEmail.toString(),
                            dateTimeAtCreation = convertLongToTime(it.dateTimeAtCreation.toLong(), "MM.dd.yyyy HH:mm"),
                            roles = it.roles.toString(),
                            hashCode = it.hashCode,
                        )
                    }

//                    val itemType = object : TypeToken<List<UserRepositoryForUsersTable>>() {}.type
//                    val usersList = gson.fromJson<List<UserRepositoryForUsersTable>>(usersListJSON.users, itemType).map {
//                        it.copy(
//                            dateTimeAtCreation = convertLongToTime(it.dateTimeAtCreation.toLong(), "MM.dd.yyyy HH:mm"),
//                            isBlocked = if (it.isBlocked.toBoolean()) "Да" else "Нет"
//                        )
//                    }

                    call.respondHtmlTemplate(AdminPanelMainLayout(), HttpStatusCode.OK) {
                        page = adminUsersPage {
                            /** Построитель панели управления пользователями */
                            usersControlPanel = controlPanel {
                                buttons = ButtonsAdminUsersControlPanel()
                            }

                            /** Построитель таблицы пользователей */
                            usersTable = dataTable {
                                /** Построитель заголовков таблицы */
                                wrapperID = "user_table"
                                tableHeaders = mapOf(
                                    "_id" to "ID",
                                    "dateTimeAtCreation" to "Дата регистрации",
                                    "email" to "email",
                                    "fullName" to "ФИО",
                                    "zipCode" to "Индекс",
                                    "address" to "Адрес",
                                    "isBlocked" to "Заблокированный"
                                )
                                /** Построитель тела таблицы */
                                dataBody = usersList
                                /** Построитель элементов управления пагинацией */
                                pagination = adminUsersTablePagination {
                                    currentPage = pageNum
                                    countPage = ceil(usersListJSON.count.toDouble() / limit).toInt()
                                    limitItems = limit
                                    limitShowPages = 3
                                }
                            }
                        }

                        styleUrl = listOf("/static/admin-users.css")
                    }
                } else {
                    call.respondRedirect("/admin/panel/login", false)
                }
            }
        }
    }
}