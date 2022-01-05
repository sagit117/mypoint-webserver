package ru.mypoint.webserver.domains.front.templates.components.collections.buttons

import io.ktor.html.*
import kotlinx.html.*

/**
 * Набор кнопок для формы забыли пароль(админ)
 */
class ButtonsForgotAdminPage: Template<FlowContent> {
    override fun FlowContent.apply() {
        div {
            classes = setOf("login_form__actions", "mt-4")

            a {
                id = "btnEnter"
                href = "/admin/panel/login"
                classes = setOf("btn", "btn-primary")
                +"Вход"
            }
            button {
                id = "btnOk"
                type = ButtonType.submit
                classes = setOf("btn", "btn-success")
                +"Отправить запрос"
            }
        }
    }
}