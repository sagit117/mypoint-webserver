package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.*

fun adminHomePage(init: AdminHomePage.() -> Unit): AdminHomePage {
    val page = AdminHomePage()
    page.init()
    return page
}

class AdminHomePage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()

    override fun FlowContent.apply() {
        div {
            classes = setOf("admin_home_wrapper")
        }
    }
}