package ru.mypoint.webserver.domains.front.templates.components.collections.menus

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.components.sideMenuItems

class ItemsAdminLeftSideMenu: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()

    override fun FlowContent.apply() {
        div {
            classes = setOf("side_menu__items")

            insert(sideMenuItems {
                ahref = "/admin/panel"
                caption = "Домой"
                imgSrc = "/static/home.svg"
            }, content)
            insert(sideMenuItems {
                ahref = "/admin/panel/users"
                caption = "Пользователи"
                imgSrc = "/static/users.svg"

                subItems = sideMenuItems {
                    ahref = "/admin/panel/roles"
                    caption = "Роли"
                    imgSrc = "/static/roles.svg"
                }
            }, content)
        }
    }
}