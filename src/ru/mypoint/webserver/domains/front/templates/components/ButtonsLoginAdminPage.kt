package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*

/**
 * Набор кнопок для формы логина
 */
class ButtonsLoginAdminPage: Template<FlowContent> {
    override fun FlowContent.apply() {
        div {
            button {
                id = "forgot_password"
                classes = setOf("btn primary")
                +"Забыли пароль?"
            }
            button {
                id = "login"
                classes = setOf("btn success")
                +"Войти"
            }
        }
    }
}