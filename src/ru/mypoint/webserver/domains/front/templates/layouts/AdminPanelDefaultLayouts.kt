package ru.mypoint.webserver.domains.front.templates.layouts

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.pages.BasePage

/** шаблон по умолчанию, в котором будут отрисовываться страницы админ панели */
class AdminPanelDefaultLayouts: Template<HTML> {
    private val content = TemplatePlaceholder<BasePage>()
    lateinit var page: BasePage

    override fun HTML.apply() {
        head {
            meta(name = "viewport", content = "width=device-width, initial-scale=1")
//            link {
//                rel = "shortcut icon"
//                href = Config.appFavicon
//                type = "image/png"
//            }
            styleLink(url = "/static/index.css")
//            title(Config.appTitle)
        }

        body {
            insert(page, content)
        }
    }
}