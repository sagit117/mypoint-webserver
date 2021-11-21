package ru.mypoint.webserver.domains.notification.dto

data class SendNotificationDTO(
    val type: TypeNotification,
    val recipients: Set<String>,
    val templateName: String,
    val payloads: String? = null,
)

enum class TypeNotification {
    EMAIL
}

