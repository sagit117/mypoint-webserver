package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.FlowContent
import kotlinx.html.classes
import kotlinx.html.div
import ru.mypoint.webserver.ConfigApp

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

            div {
                classes = setOf("left-side-menu__title")
                +ConfigApp.title
            }
            div {
                classes = setOf("left-side-menu__close")
            }
            div {
                classes = setOf("left-side-menu__buttons")

                insert(buttons, content)
            }
            div {
                classes = setOf("left-side-menu__footer")
                +ConfigApp.leftSideMenuFooterTitle
            }
        }
    }
}