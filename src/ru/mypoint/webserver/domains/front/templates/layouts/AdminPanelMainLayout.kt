package ru.mypoint.webserver.domains.front.templates.layouts

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.ConfigApp
import ru.mypoint.webserver.domains.front.templates.components.collections.buttons.ButtonsAdminHomeTopPanel
import ru.mypoint.webserver.domains.front.templates.components.collections.menus.ItemsAdminLeftSideMenu
import ru.mypoint.webserver.domains.front.templates.components.leftSideMenu
import ru.mypoint.webserver.domains.front.templates.components.topPanel

class AdminPanelMainLayout: Template<HTML> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var page: Template<FlowContent>
    lateinit var styleUrl: List<String>
    private val topPanel = topPanel {
        buttons = ButtonsAdminHomeTopPanel()
    }
    private val lefSideMenu = leftSideMenu {
        items = ItemsAdminLeftSideMenu()
    }

    override fun HTML.apply() {
        head {
            meta(name = "viewport", content = "width=device-width, initial-scale=1")
            link {
                rel = "shortcut icon"
                href = "/static/favicon.png"
                type = "image/png"
            }
            link {
                rel = "manifest"
                href = "/static/manifest.json"
            }
            styleLink(url = "/static/index.css?v=170120220853")

            styleUrl.forEach {
                styleLink(it)
            }

            script {
                src = "/static/registerSW.js"
            }

            title(ConfigApp.title)
        }

        body {
            div {
                classes = setOf("content_wrapper")

                div {
                    id = "toasts"
                    classes = setOf("toasts_wrapper")
                }

                insert(topPanel, content)

                insert(lefSideMenu, content)

                insert(page, content)
            }

            script {
                src = "/static/topPanelController.js"
                type = "module"
            }
        }
    }
}