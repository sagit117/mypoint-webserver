package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*

class ItemsAdminLeftSideMenu: Template<FlowContent> {

    override fun FlowContent.apply() {
        div {
            classes = setOf("side_menu__group")

            div {
                classes = setOf("side_menu__group__items")

                div {
                    classes = setOf("side_menu__group__item")

                    img {
                        src = "/static/users.svg"
                        classes = setOf("mr-1")
                    }
                    a {
                        href = "/admin/panel/users"
                        +"Пользователи"
                    }
                }
            }
        }
    }
}