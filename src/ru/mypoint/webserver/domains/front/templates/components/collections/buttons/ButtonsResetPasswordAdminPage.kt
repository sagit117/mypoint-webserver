package ru.mypoint.webserver.domains.front.templates.components.collections.buttons

import io.ktor.html.*
import kotlinx.html.*

/**
 * Набор кнопок для формы восстановить пароль(админ)
 */
class ButtonsResetPasswordAdminPage: Template<FlowContent> {
    override fun FlowContent.apply() {
        div {
            classes = setOf("login_form__actions", "mt-4")

            a {
                id = "btnEnter"
                classes = setOf("btn", "btn-primary")
                href = "/admin/panel/login"
                +"Вход"
            }
            button {
                id = "btnOk"
                type = ButtonType.submit
                classes = setOf("btn", "btn-success")
                +"Изменить пароль"
            }
        }
    }
}
