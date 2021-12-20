package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*

fun sideMenuItems(init: SideMenuItems.() -> Unit): SideMenuItems {
    val menuItem = SideMenuItems()
    menuItem.init()
    return menuItem
}

class SideMenuItems: Template<FlowContent> {
    lateinit var ahref: String
    lateinit var caption: String
    lateinit var imgSrc: String

    override fun FlowContent.apply() {
        div {
            classes = setOf("side_menu__group__item")

            img {
                src = imgSrc
                classes = setOf("mr-1")
                alt = caption
            }
            a {
                href = ahref
                +caption
            }
        }
    }

}