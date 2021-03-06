package ru.mypoint.webserver.domains.front.templates.components.collections.buttons

import io.ktor.html.*
import kotlinx.html.*

/**
 * Набор кнопок для формы логина(админ)
 */
class ButtonsLoginAdminPage: Template<FlowContent> {
    override fun FlowContent.apply() {
        div {
            classes = setOf("login_form__actions", "mt-4")

            a {
                id = "btnForgot"
                href = "/admin/panel/forgot/password"
                classes = setOf("btn", "btn-primary")
                +"Забыли пароль?"

            }
            button {
                id = "btnOk"
                type = ButtonType.submit
                classes = setOf("btn", "btn-success")
                +"Войти"
            }
        }
    }
}