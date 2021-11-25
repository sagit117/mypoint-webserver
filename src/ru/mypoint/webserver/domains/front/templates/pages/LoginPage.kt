package ru.mypoint.webserver.domains.front.templates.pages

import kotlinx.html.*

class LoginPage: BasePage() {
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
        }
    }
}