package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.components.inputBlock

fun loginPage(init: LoginPage.() -> Unit): LoginPage {
    val page = LoginPage()
    page.init()
    return page
}

class LoginPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var buttons: Template<FlowContent>
    private val loginInput = inputBlock() {
        caption = "login: "
        inputId = "login"
        inputType = InputType.email
    }
    private val passwordInput = inputBlock() {
        caption = "password: "
        inputId = "password"
        inputType = InputType.password
    }

    override fun FlowContent.apply() {
        div {
            id = "login_form"
            classes = setOf("login_form")

            h3 {
                +"Вход в систему"
            }

            insert(loginInput, content)

            insert(passwordInput, content)

            insert(buttons, content)
        }
    }
}