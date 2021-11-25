package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.components.inputTextBlock

fun loginPage(init: LoginPage.() -> Unit): LoginPage {
    val page = LoginPage()
    page.init()
    return page
}

class LoginPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var buttons: Template<FlowContent>

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

    override fun FlowContent.apply() {
        div {
            classes = setOf("login_wrapper")

            div {
                id = "login_form"
                classes = setOf("login_form", "mt-8")

                h3 {
                    +"Вход в систему"
                }

                insert(loginInput, content)

                insert(passwordInput, content)

                insert(buttons, content)
            }
        }
    }
}