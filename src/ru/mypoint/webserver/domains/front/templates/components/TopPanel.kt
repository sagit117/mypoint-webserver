package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.ConfigApp

fun topPanel(init: TopPanel.() -> Unit): TopPanel {
    val panel = TopPanel()
    panel.init()
    return panel
}

class TopPanel: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var buttons: Template<FlowContent>

    override fun FlowContent.apply() {
        div {
            classes = setOf("top_panel")

            div {
                id = "left_side_menu_toggle"
                classes = setOf("main_menu_toggle")
                tabIndex = "0"
            }
            div {
                classes = setOf("top_panel_title", "ml-2")
                +ConfigApp.title
            }

            insert(buttons, content)
        }
    }
}