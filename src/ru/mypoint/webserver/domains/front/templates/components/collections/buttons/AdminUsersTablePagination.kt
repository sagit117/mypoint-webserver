package ru.mypoint.webserver.domains.front.templates.components.collections.buttons

import io.ktor.html.*
import kotlinx.html.*

fun adminUsersTablePagination(init: AdminUsersTablePagination.() -> Unit): AdminUsersTablePagination {
    val buttons = AdminUsersTablePagination()
    buttons.init()
    return buttons
}

class AdminUsersTablePagination: Template<FlowContent> {
    var currentPage = 1
    var countPage = 1
    var limitItems = 50

    override fun FlowContent.apply() {
        a {
            href = "/admin/users?limit=$limitItems&pageNum=1"

            button {
                id = "btnLeftAll"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-left-all", "mr-1")
                title = "Переместиться к началу"
            }
        }
        a {
            href = "/admin/users?limit=$limitItems&pageNum=${if ((currentPage - 1) == 0) 1 else currentPage - 1 }"

            button {
                id = "btnLeft"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-left", "mr-1")
                title = "Предыдущая страница"
            }
        }

        for (page in 1..countPage) {
            if (page == currentPage) {
                button {
                    id = "btnCurrentPage"
                    type = ButtonType.button
                    classes = setOf("btn", "btn-warning", "mr-1")
                    disabled = true
                    +currentPage.toString()
                }
            } else {
                a {
                    href = "/admin/users?limit=$limitItems&pageNum=$page"

                    button {
                        type = ButtonType.button
                        classes = setOf("btn", "btn-warning", "mr-1")
                        +page.toString()
                    }
                }
            }
        }

        a {
            href = "/admin/users?limit=$limitItems&pageNum=${if ((currentPage + 1) > countPage) countPage else currentPage + 1 }"

            button {
                id = "btnRight"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-right", "ml-1")
                title = "Следующая страница"
            }
        }

        a {
            href = "/admin/users?limit=$limitItems&pageNum=$countPage"

            button {
                id = "btnRightAll"
                type = ButtonType.button
                classes = setOf("btn", "btn-warning", "pagination-right-all", "ml-1")
                title = "Переместиться к концу"
            }
        }

    }
}
