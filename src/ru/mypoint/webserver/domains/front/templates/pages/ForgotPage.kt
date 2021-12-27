package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.*

fun forgotPage(init: ForgotPage.() -> Unit): ForgotPage {
    val page = ForgotPage()
    page.init()
    return page
}

class ForgotPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var formForgot: Template<FlowContent>

    override fun FlowContent.apply() {
        div {
            classes = setOf("login_wrapper")

            insert(formForgot, content)

            script {
                src = "/static/forgotFormController.js"
                type = "module"
            }
        }
    }
}