package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.components.inputTextBlock

fun resetPasswordPage(init: ResetPasswordPage.() -> Unit): ResetPasswordPage {
    val page = ResetPasswordPage()
    page.init()
    return page
}

class ResetPasswordPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var formReset: Template<FlowContent>

    override fun FlowContent.apply() {
        div {
            classes = setOf("login_wrapper")

            insert(formReset, content)

            script {
                src = "/static/resetPasswordFormController.js"
                type = "module"
            }
        }
    }
}