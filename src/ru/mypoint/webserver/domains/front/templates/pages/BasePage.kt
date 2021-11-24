package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.FlowContent

/** базовый класс для наследования страницами */
open class BasePage: Template<FlowContent> {
    override fun FlowContent.apply() {
    }
}