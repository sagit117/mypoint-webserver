package ru.mypoint.webserver.domains.users.dto

data class UserUpdatePasswordDTO(
    val email: String,
    val newPassword: String,
    val oldPassword: String? = null
)
