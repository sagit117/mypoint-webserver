package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.FlowContent
import kotlinx.html.classes
import kotlinx.html.div

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

            insert(buttons, content)
        }
    }
}