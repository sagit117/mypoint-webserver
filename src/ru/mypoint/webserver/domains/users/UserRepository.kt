package ru.mypoint.webserver.domains.users

/**
 * Класс для хранилища пользователей
 */
data class UserRepository(
    val _id: String,
    val email: String,
    val fullName: String,
    val zipCode: String,
    val address: String,
    val isBlocked: Boolean,
    val isNeedsPassword: Boolean,
    val isConfirmEmail: Boolean,
    val dateTimeAtCreation: String,
    val roles: MutableList<String> = mutableListOf(),
    val hashCode: String,
)