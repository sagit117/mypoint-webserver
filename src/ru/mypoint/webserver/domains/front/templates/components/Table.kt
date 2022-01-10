package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*
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
    lateinit var pagination: Template<FlowContent>
    var wrapperID: String = ""

    override fun FlowContent.apply() {
        div {
            id = wrapperID
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
                            val titleCell = readInstanceProperty<String>(dataRow, it.key)

                            title = titleCell
                            +titleCell
                        } catch (_: Throwable) {}
                    }
                }
            }
        }

        div {
            classes = setOf("table-footer", "mt-2")

            insert(pagination, content)
        }
    }
}

