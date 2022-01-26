package ru.mypoint.webserver.domains.front.templates.pages

import io.ktor.html.*
import kotlinx.html.*
import ru.mypoint.webserver.domains.front.templates.components.inputTextBlock
import ru.mypoint.webserver.domains.users.UserRepository

fun adminUserPage(init: AdminUserPage.() -> Unit): AdminUserPage {
    val page = AdminUserPage()
    page.init()
    return page
}

class AdminUserPage: Template<FlowContent> {
    private val content = TemplatePlaceholder<Template<FlowContent>>()
    var userRepository: UserRepository? = null

    override fun FlowContent.apply() {
        form {
            classes = setOf("user-wrapper")

            insert(inputTextBlock() {
                caption = "Email: "
                inputId = "email"
                inputType = InputType.email
                inputName = "email"
                inputValue = userRepository?.email ?: ""
                inputDisabled = userRepository?.email != null
            }, content)
        }
    }
}