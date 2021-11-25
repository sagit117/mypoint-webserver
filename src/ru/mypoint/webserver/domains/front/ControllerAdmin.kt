package ru.mypoint.webserver.domains.front

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.http.*
import io.ktor.routing.*
import ru.mypoint.webserver.domains.front.templates.components.ButtonsLoginAdminPage
import ru.mypoint.webserver.domains.front.templates.layouts.AdminPanelDefaultLayouts
import ru.mypoint.webserver.domains.front.templates.pages.LoginPage
import ru.mypoint.webserver.domains.front.templates.pages.loginPage

@Suppress("unused") // Referenced in application.conf
fun Application.adminModule() {
    routing {
        route("/admin") {
            get("/panel") {
                call.respondHtmlTemplate(AdminPanelDefaultLayouts(), HttpStatusCode.OK) {
                    page = loginPage {
                        buttons = ButtonsLoginAdminPage()
                    }
                }
            }
        }
    }
}