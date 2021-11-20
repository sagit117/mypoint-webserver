package ru.mypoint.webserver.domains.users.dto

data class UserUpdateDataDTO(
    val email: String?,
    val fullName: String?,
    val zipCode: Int?,
    val address: String?,
)
