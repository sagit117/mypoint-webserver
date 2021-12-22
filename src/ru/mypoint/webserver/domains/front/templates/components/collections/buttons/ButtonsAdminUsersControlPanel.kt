package ru.mypoint.webserver.domains.front.templates.components.collections.buttons

import io.ktor.html.*
import kotlinx.html.*

class ButtonsAdminUsersControlPanel: Template<FlowContent> {
    override fun FlowContent.apply() {
        button {
            id = "btnNewUser"
            type = ButtonType.button
            classes = setOf("btn", "btn-primary")
            +"Добавить"
        }
    }
}