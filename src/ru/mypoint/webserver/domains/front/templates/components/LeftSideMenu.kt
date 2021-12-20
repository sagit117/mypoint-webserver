package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.ConfigApp

fun leftSideMenu(init: LeftSideMenu.() -> Unit): LeftSideMenu {
    val menu = LeftSideMenu()
    menu.init()
    return menu
}

class LeftSideMenu: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var items: Template<FlowContent>

    override fun FlowContent.apply() {
        div {
            id = "left_side_menu"
            classes = setOf("left_side_menu")

            div {
                classes = setOf("left-side-menu__title")
                +ConfigApp.title
            }
            div {
                id = "close"
                classes = setOf("left-side-menu__close")
                tabIndex = "0"
            }
            div {
                classes = setOf("left-side-menu__body")

                insert(items, content)
            }
            div {
                classes = setOf("left-side-menu__footer")
                +ConfigApp.leftSideMenuFooterTitle
            }
        }
    }
}