package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.FlowContent
import kotlinx.html.classes
import kotlinx.html.div

fun dataTable(init: Table.() -> Unit): Table {
    val dataTable = Table()
    dataTable.init()
    return dataTable
}

/** Таблица данных */
class Table: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    private var mapData: Map<String, String> = emptyMap()

    override fun FlowContent.apply() {
        div {
            classes = setOf("table-wrapper")


        }
    }
}