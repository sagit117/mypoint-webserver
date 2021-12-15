package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.ConfigApp

class ButtonsAdminLeftSideMenu: Template<FlowContent> {

    override fun FlowContent.apply() {
        div {
            classes = setOf("left-side-menu__title")
            +ConfigApp.title
        }
    }
}