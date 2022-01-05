package ru.mypoint.webserver.domains.front.templates.components.collections.buttons

import io.ktor.html.*
import kotlinx.html.*
import kotlin.math.floor

fun adminUsersTablePagination(init: AdminUsersTablePagination.() -> Unit): AdminUsersTablePagination {
    val buttons = AdminUsersTablePagination()
    buttons.init()
    return buttons
}

class AdminUsersTablePagination: Template<FlowContent> {
    var currentPage = 1 // текущая страница
    var countPage = 1 // всего страниц
    var limitItems = 50 // количество записей в таблице
    var limitShowPages = 5 // количество отображаемых страниц

    override fun FlowContent.apply() {
        a {
            href = "/admin/users?limit=$limitItems&pageNum=1"

            button {
                id = "btnLeftAll"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-left-all", "mr-1")
                title = "Переместиться к началу"
                disabled = (currentPage - 1) == 0
            }
        }
        a {
            href = "/admin/users?limit=$limitItems&pageNum=${if ((currentPage - 1) == 0) 1 else currentPage - 1 }"

            button {
                id = "btnLeft"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-left", "mr-1")
                title = "Предыдущая страница"
                disabled = (currentPage - 1) == 0
            }
        }

        val pages = if (limitShowPages < countPage) limitShowPages else countPage // количество отображаемых страниц

        var pageStart = currentPage - floor(pages.toDouble() / 2).toInt() // стартовая страница
        if (pageStart <= 0) pageStart = 1

        var pageStop = currentPage + floor(pages.toDouble() / 2).toInt()
        if (pageStop >= countPage) pageStop = countPage

        for (page in pageStart..pageStop) {
            a {
                href = "/admin/users?limit=$limitItems&pageNum=$page"

                button {
                    type = ButtonType.button
                    classes = setOf("btn", "btn-warning", "mr-1", if (page == currentPage) "current-page" else "")
                    +page.toString()
                }
            }
        }

        a {
            href = "/admin/users?limit=$limitItems&pageNum=${if ((currentPage + 1) > countPage) countPage else currentPage + 1 }"

            button {
                id = "btnRight"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-right")
                title = "Следующая страница"
                disabled = (currentPage + 1) > countPage
            }
        }

        a {
            href = "/admin/users?limit=$limitItems&pageNum=$countPage"

            button {
                id = "btnRightAll"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-right-all", "ml-1")
                title = "Переместиться к концу"
                disabled = (currentPage + 1) > countPage
            }
        }

    }
}
