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
    var currentPage = 1     // текущая страница
    var countPage = 1       // всего страниц
    var limitItems = 50     // количество записей в таблице
    var limitShowPages = 5  // количество отображаемых страниц

    override fun FlowContent.apply() {
        currentPage = if (currentPage <= 0) 1 else currentPage

        val disabledMoveToLeft = (currentPage - 1) <= 0

        /** Перемотка в лево */
        a {
            href = "/admin/users?limit=$limitItems&pageNum=1"
            title = "Переместиться к началу"
            classes = setOf(if (disabledMoveToLeft) "disabled" else "")

            button {
                id = "btnLeftAll"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-left-all", "mr-1")
                disabled = disabledMoveToLeft
                name = "moveToStart"
                attributes["aria-label"] = "Move to start"
            }
        }
        a {
            href = "/admin/users?limit=$limitItems&pageNum=${if ((currentPage - 1) == 0) 1 else currentPage - 1 }"
            title = "Предыдущая страница"
            classes = setOf(if (disabledMoveToLeft) "disabled" else "")

            button {
                id = "btnLeft"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-left", "mr-1")
                disabled = disabledMoveToLeft
                name = "moveToLeft"
                attributes["aria-label"] = "Move to left"
            }
        }

        /** Отображение страниц */
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

        val disabledMoveToRight = (currentPage + 1) > countPage

        /** Перемотка в право */
        a {
            href = "/admin/users?limit=$limitItems&pageNum=${if ((currentPage + 1) > countPage) countPage else currentPage + 1 }"
            title = "Следующая страница"
            classes = setOf(if (disabledMoveToRight) "disabled" else "")

            button {
                id = "btnRight"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-right")
                disabled = disabledMoveToRight
                name = "moveToRight"
                attributes["aria-label"] = "Move to right"
            }
        }

        a {
            href = "/admin/users?limit=$limitItems&pageNum=$countPage"
            title = "Переместиться к концу"
            classes = setOf(if (disabledMoveToRight) "disabled" else "")

            button {
                id = "btnRightAll"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-right-all", "ml-1")
                disabled = disabledMoveToRight
                name = "moveToEnd"
                attributes["aria-label"] = "Move to end"
            }
        }

    }
}
