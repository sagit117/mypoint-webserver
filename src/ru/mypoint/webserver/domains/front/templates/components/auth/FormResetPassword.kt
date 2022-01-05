package ru.mypoint.webserver.domains.front.templates.components.auth

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.components.inputTextBlock

fun formResetPassword(init: FormResetPassword.() -> Unit): FormResetPassword {
    val form = FormResetPassword()
    form.init()
    return form
}

/** Форма восстановления пароля */
class FormResetPassword: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var buttons: Template<FlowContent>
    var code: String = ""
    private val passwordInput = inputTextBlock() {
        caption = "Пароль: "
        inputId = "password"
        inputType = InputType.password
        inputName = "newPassword"
    }
    private val confirmPasswordInput = inputTextBlock() {
        caption = "Пароль еще раз: "
        inputId = "confirm"
        inputType = InputType.password
        extClass = "mt-2"
    }

    override fun FlowContent.apply() {
        form {
            id = "reset_password_form"
            classes = setOf("login_form", "mt-8")
            method = FormMethod.post
            action = "/v1/users/update/password/hash/"

            h3 {
                +"Новый пароль"
            }

            div {
                id = "spinner"
                classes = setOf("spinner_wrapper")

                div {
                    classes = setOf("spinner")
                }
            }

            insert(passwordInput, content)
            insert(confirmPasswordInput, content)
            insert(
                inputTextBlock() {
                    inputType = InputType.hidden
                    inputValue = code
                    inputName = "hash"
                }, content
            )

            insert(buttons, content)
        }
    }
}