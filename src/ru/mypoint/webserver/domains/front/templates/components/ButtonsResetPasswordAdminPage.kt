package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*

/**
 * Набор кнопок для формы восстановить пароль(админ)
 */
class ButtonsResetPasswordAdminPage: Template<FlowContent> {
    override fun FlowContent.apply() {
        div {
            classes = setOf("login_form__actions", "mt-4")

            button {
                id = "btnEnter"
                type = ButtonType.button
                classes = setOf("btn", "btn-primary")
                +"Вход"
            }
            button {
                id = "btnOk"
                type = ButtonType.button
                classes = setOf("btn", "btn-success")
                +"Изменить пароль"
            }
        }
    }
}
