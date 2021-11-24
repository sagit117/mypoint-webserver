package ru.mypoint.webserver.domains.front.templates.pages

import kotlinx.html.*

class AdminLoginPage: BasePage() {
    override fun FlowContent.apply() {
        div {
            h1 {
                +"admin login "
            }
        }
    }
}