package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*

/**
 * Набор кнопок для формы логина(админ)
 */
class ButtonsLoginAdminPage: Template<FlowContent> {
    override fun FlowContent.apply() {
        div {
            classes = setOf("login_form__actions", "mt-4")

            button {
                id = "btnForgot"
                type = ButtonType.button
                classes = setOf("btn", "btn-primary")
                +"Забыли пароль?"
            }
            button {
                id = "btnOk"
                type = ButtonType.button
                classes = setOf("btn", "btn-success")
                +"Войти"
            }
        }
    }
}