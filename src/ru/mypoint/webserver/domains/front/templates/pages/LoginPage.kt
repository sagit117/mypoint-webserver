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
    lateinit var formLogin: Template<FlowContent>

    override fun FlowContent.apply() {
        div {
            classes = setOf("login_wrapper")

            insert(formLogin, content)

            script {
                src = "/static/loginFormController.js"
                type = "module"
            }
        }
    }
}