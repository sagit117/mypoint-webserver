package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.ConfigApp

class ButtonsAdminHomeTopPanel: Template<FlowContent> {

    override fun FlowContent.apply() {
        div {
            id = "main_menu"
            classes = setOf("main_menu_toggle")
            tabIndex = "0"
        }
        div {
            classes = setOf("top_panel_title", "ml-2")
            +ConfigApp.title
        }
    }
}