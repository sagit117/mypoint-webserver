package ru.mypoint.webserver.domains.users.dto

data class UserRegistryDTO(
    val email: String,
    val password: String,
    val fullName: String? = "",
    val zipCode: Int? = 0,
    val address: String? = "",
)
