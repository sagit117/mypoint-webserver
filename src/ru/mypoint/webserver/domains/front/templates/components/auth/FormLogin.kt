package ru.mypoint.webserver.domains.front.templates.components.auth

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.components.inputTextBlock

fun formLogin(init: FormLogin.() -> Unit): FormLogin {
    val form = FormLogin()
    form.init()
    return form
}

/** Форма входа в систему */
class FormLogin: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    private val loginInput = inputTextBlock() {
        caption = "Логин: "
        inputId = "login"
        inputType = InputType.email
    }
    private val passwordInput = inputTextBlock() {
        caption = "Пароль: "
        inputId = "password"
        inputType = InputType.password
        extClass = "mt-2"
    }
    lateinit var buttons: Template<FlowContent>

    override fun FlowContent.apply() {
        form {
            id = "login_form"
            classes = setOf("login_form", "mt-8")

            h3 {
                +"Вход в систему"
            }

            div {
                id = "spinner"
                classes = setOf("spinner_wrapper")

                div {
                    classes = setOf("spinner")
                }
            }

            insert(loginInput, content)

            insert(passwordInput, content)

            insert(buttons, content)
        }
    }
}