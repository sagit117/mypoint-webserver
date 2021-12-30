package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.FlowContent
import kotlinx.html.classes
import kotlinx.html.div
import ru.mypoint.webserver.common.readInstanceProperty

fun dataTable(init: Table.() -> Unit): Table {
    val dataTable = Table()
    dataTable.init()
    return dataTable
}

/** Таблица данных */
class Table: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    var tableHeaders: Map<String, String> = emptyMap() // Заголовки таблицы
    var dataBody: List<Any> = emptyList()

    override fun FlowContent.apply() {
        div {
            classes = setOf("table-wrapper", "mt-1")

            tableHeaders.forEach {
                div {
                    classes = setOf("table-header", "p-1")
                    +it.value
                }
            }

            dataBody.forEach { dataRow ->
                tableHeaders.forEach {
                    div {
                        classes = setOf("table-cell")

                        try {
                            +readInstanceProperty<String>(dataRow, it.key)
                        } catch (error: Throwable) {}
                    }
                }
            }
        }
    }
}

