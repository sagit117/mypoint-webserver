package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*

class ItemsAdminLeftSideMenu: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()

    override fun FlowContent.apply() {
        div {
            classes = setOf("side_menu__group")

            div {
                classes = setOf("side_menu__group__items")

                insert(sideMenuItems {
                    ahref = "/admin/panel"
                    caption = "Домой"
                    imgSrc = "/static/home.svg"
                }, content)
                insert(sideMenuItems {
                    ahref = "/admin/panel/users"
                    caption = "Пользователи"
                    imgSrc = "/static/users.svg"
                }, content)
            }
        }
    }
}