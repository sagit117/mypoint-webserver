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
    var subItems: Template<FlowContent>? = null
    private val content = TemplatePlaceholder<Template<FlowContent>>()

    override fun FlowContent.apply() {
        div {
            classes = setOf("side_menu__item__wrapper")

            a {
                classes = setOf("side_menu__item")
                href = ahref

                img {
                    src = imgSrc
                    classes = setOf("mr-1")
                    alt = caption
                }
                span {
                    +caption
                }
            }

            subItems?.let {
                div {
                    classes = setOf("side_menu__items__toggle")

                    img {
                        src = "/static/chevron-right.svg"
                    }
                }
            }
        }

        subItems?.let {
            div {
                classes = setOf("side_menu__sub_item", "ml-2")

                insert(it, content)
            }
        }
    }

}