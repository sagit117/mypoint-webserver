package ru.mypoint.webserver.domains.front.templates.layouts

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.ConfigApp

/** Шаблон по умолчанию, в котором будут обрисовываться страницы админ панели */
class AdminPanelDefaultLayout: Template<HTML> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var page: Template<FlowContent>
    lateinit var styleUrl: List<String>

    override fun HTML.apply() {
        head {
            lang = "ru-RU"
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
            styleLink(url = "/static/index.css")

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

                insert(page, content)
            }
        }
    }
}