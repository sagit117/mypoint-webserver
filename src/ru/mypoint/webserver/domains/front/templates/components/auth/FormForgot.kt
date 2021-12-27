package ru.mypoint.webserver.domains.front.templates.components.auth

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.components.inputTextBlock

fun formForgot(init: FormForgot.() -> Unit): FormForgot {
    val form = FormForgot()
    form.init()
    return form
}

/** Форма забыли пароль */
class FormForgot: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var buttons: Template<FlowContent>
    private val loginInput = inputTextBlock() {
        caption = "Логин: "
        inputId = "login"
        inputType = InputType.email
    }

    override fun FlowContent.apply() {
        div {
            id = "forgot_form"
            classes = setOf("login_form", "mt-8")

            h3 {
                +"Восстановление пароля"
            }

            div {
                id = "spinner"
                classes = setOf("spinner_wrapper")

                div {
                    classes = setOf("spinner")
                }
            }

            insert(loginInput, content)

            insert(buttons, content)
        }
    }
}