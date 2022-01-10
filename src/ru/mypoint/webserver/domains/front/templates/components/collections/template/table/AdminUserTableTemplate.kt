package ru.mypoint.webserver.domains.front.templates.components.collections.template.table

/**
 * Класс для хранения шаблона вывода ячеек в таблице пользователей
 */
data class AdminUserTableTemplate(
    val _id: String,
    val email: String,
    val fullName: String,
    val zipCode: String,
    val address: String,
    val isBlocked: String,
    val isNeedsPassword: String,
    val isConfirmEmail: String,
    val dateTimeAtCreation: String,
    val roles: String,
    val hashCode: String,
)
