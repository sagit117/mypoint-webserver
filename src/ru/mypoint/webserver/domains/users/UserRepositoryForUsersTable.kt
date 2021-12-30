package ru.mypoint.webserver.domains.users

import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType

/**
 * Класс для хранилища пользователей
 */
data class UserRepositoryForUsersTable(
    val id: JvmType.Object,
    val email: String,
    val fullName: String,
    val zipCode: String,
    val address: String,
    val isBlocked: String,
    val isNeedsPassword: String,
    val isConfirmEmail: String,
    val dateTimeAtCreation: String,
    val roles: MutableList<String> = mutableListOf(),
    val hashCode: String
)