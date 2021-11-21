package ru.mypoint.webserver.domains.notification.dto

data class TemplateEmailCreateDTO(
    val name: String,
    val template: String,
    val subject: String = "",
    val altMsgText: String = ""
)
