package ru.mypoint.webserver.domains.front.templates.components.collections.buttons

import io.ktor.html.*
import kotlinx.html.*

fun buttonsAdminUsersNumPages(init: ButtonsAdminUsersNumPages.() -> Unit): ButtonsAdminUsersNumPages {
    val buttons = ButtonsAdminUsersNumPages()
    buttons.init()
    return buttons
}

class ButtonsAdminUsersNumPages: Template<FlowContent> {
    var currentPage = 1

    override fun FlowContent.apply() {
        button {
            id = "btnCurrentPage"
            type = ButtonType.button
            classes = setOf("btn", "btn-warning")
            +currentPage.toString()

        }
    }
}
