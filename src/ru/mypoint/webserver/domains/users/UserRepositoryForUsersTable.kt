package ru.mypoint.webserver.domains.users

/**
 * Класс для хранилища пользователей
 */
data class UserRepositoryForUsersTable(
    val _id: String,
    val email: String,
    val fullName: String,
    val zipCode: String,
    val address: String,
    val isBlocked: String,
    val isNeedsPassword: String,
    val isConfirmEmail: String,
    val dateTimeAtCreation: String,
    val roles: MutableList<String> = mutableListOf(),
    val hashCode: String,
)