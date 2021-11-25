package ru.mypoint.webserver.domains.front.templates.layouts

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.ConfigApp

/** шаблон по умолчанию, в котором будут отрисовываться страницы админ панели */
class AdminPanelDefaultLayouts: Template<HTML> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var page: Template<FlowContent>

    override fun HTML.apply() {
        head {
            meta(name = "viewport", content = "width=device-width, initial-scale=1")
            link {
                rel = "shortcut icon"
                href = "/image/favicon.png"
                type = "image/png"
            }
            styleLink(url = "/static/index.css")
            title(ConfigApp.title)
        }

        body {
            insert(page, content)
        }
    }
}