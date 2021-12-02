package ru.mypoint.webserver.domains.front

import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.*
import io.ktor.client.features.json.*
import io.ktor.client.request.*
import io.ktor.html.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.*
import ru.mypoint.webserver.common.dto.*
import ru.mypoint.webserver.domains.front.templates.components.ButtonsLoginAdminPage
import ru.mypoint.webserver.domains.front.templates.layouts.AdminPanelDefaultLayouts
import ru.mypoint.webserver.domains.front.templates.pages.loginPage
import ru.mypoint.webserver.domains.notification.dto.TemplateEmailCreateDTO

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

                if (result != null) call.respond(HttpStatusCode.OK, result)
                else call.respondRedirect("/admin/panel/login", false)
            }

            get("/login") {
                call.respondHtmlTemplate(AdminPanelDefaultLayouts(), HttpStatusCode.OK) {
                    page = loginPage {
                        buttons = ButtonsLoginAdminPage()
                    }
                    styleUrl = listOf("/static/form-login.css")
                }
            }
        }
    }
}