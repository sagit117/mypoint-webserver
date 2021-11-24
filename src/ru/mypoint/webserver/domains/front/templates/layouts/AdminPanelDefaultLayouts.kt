package ru.mypoint.webserver.domains.front.templates.layouts

import io.ktor.html.*
import kotlinx.html.*

class AdminPanelDefaultLayouts(): Template<HTML> {
    override fun HTML.apply() {
        head {
            meta(name = "viewport", content = "width=device-width, initial-scale=1")
//            link {
//                rel = "shortcut icon"
//                href = Config.appFavicon
//                type = "image/png"
//            }
//            styleLink(url = "/static/index.css")
//            title(Config.appTitle)
        }

        body {
            +"admin panel"
        }
    }
}