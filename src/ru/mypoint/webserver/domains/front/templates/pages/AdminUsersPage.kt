package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.*

fun adminUsersPage(init: AdminUsersPage.() -> Unit): AdminUsersPage {
    val page = AdminUsersPage()
    page.init()
    return page
}

class AdminUsersPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    lateinit var usersControlPanel: Template<FlowContent>
    lateinit var usersTable: Template<FlowContent>

    override fun FlowContent.apply() {
        div {
            classes = setOf("admin_home_wrapper", "p-2")

            h3 {
                classes = setOf("ml-2")
                +"Пользователи"
            }

            insert(usersControlPanel, content)

            insert(usersTable, content)

            script {
                src = "/static/adminUserTableController.js"
                type = "module"
            }
        }
    }
}