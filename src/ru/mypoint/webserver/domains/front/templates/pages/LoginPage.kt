package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.*

fun loginPage(init: LoginPage.() -> Unit): LoginPage {
    val page = LoginPage()
    page.init()
    return page
}

class LoginPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var buttons: Template<FlowContent>

    override fun FlowContent.apply() {
        div {
            id = "login_form"
            classes = setOf("login_form")

            h3 {
                +"Вход в систему"
            }

            input {
                id = "email"
                type = InputType.email
            }

            input {
                id = "email"
                type = InputType.password
            }

            insert(buttons, content)
        }
    }
}