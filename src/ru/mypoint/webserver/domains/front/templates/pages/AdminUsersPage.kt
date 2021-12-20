package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.FlowContent
import kotlinx.html.classes
import kotlinx.html.div

fun adminUsersPage(init: AdminUsersPage.() -> Unit): AdminUsersPage {
    val page = AdminUsersPage()
    page.init()
    return page
}

class AdminUsersPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()

    override fun FlowContent.apply() {
        div {
            classes = setOf("admin_home_wrapper")
        }
    }
}