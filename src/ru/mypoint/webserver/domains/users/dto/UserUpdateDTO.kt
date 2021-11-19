package ru.mypoint.webserver.domains.users.dto

data class UserUpdateDTO(
    val fullName: String?,
    val zipCode: Int?,
    val address: String?,
    val isBlocked: Boolean?,
    val isNeedsPassword: Boolean?,
    val isConfirmEmail: Boolean?,
    val roles: MutableList<String>?
)
