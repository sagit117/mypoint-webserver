package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.components.inputTextBlock

fun forgotPage(init: ForgotPage.() -> Unit): ForgotPage {
    val page = ForgotPage()
    page.init()
    return page
}

class ForgotPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var buttons: Template<FlowContent>

    private val loginInput = inputTextBlock() {
        caption = "Логин: "
        inputId = "login"
        inputType = InputType.email
    }

    override fun FlowContent.apply() {
        div {
            classes = setOf("login_wrapper")

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

            script {
                src = "/static/forgotFormController.js"
                type = "module"
            }
        }
    }
}