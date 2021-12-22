package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.FlowContent
import kotlinx.html.classes
import kotlinx.html.div
import kotlinx.html.id

fun controlPanel(init: ControlPanel.() -> Unit): ControlPanel {
    val panel = ControlPanel()
    panel.init()
    return panel
}

class ControlPanel: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var buttons: Template<FlowContent>

    override fun FlowContent.apply() {
        div {
            id = "control_panel"
            classes = setOf("control_panel__wrapper", "p-2")

            insert(buttons, content)
        }
    }
}