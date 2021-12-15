package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.FlowContent
import kotlinx.html.classes
import kotlinx.html.div

fun leftSideMenu(init: LeftSideMenu.() -> Unit): LeftSideMenu {
    val menu = LeftSideMenu()
    menu.init()
    return menu
}

class LeftSideMenu: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var buttons: Template<FlowContent>

    override fun FlowContent.apply() {
        div {
            classes = setOf("left_side_menu")

            insert(buttons, content)
        }
    }
}