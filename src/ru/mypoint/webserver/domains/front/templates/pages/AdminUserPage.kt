package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.FlowContent
import kotlinx.html.div

fun adminUserPage(init: AdminUserPage.() -> Unit): AdminUserPage {
    val page = AdminUserPage()
    page.init()
    return page
}

class AdminUserPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()

    override fun FlowContent.apply() {
        div {

        }
    }
}