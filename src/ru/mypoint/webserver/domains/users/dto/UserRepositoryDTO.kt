package ru.mypoint.webserver.domains.users.dto

data class UserRepositoryDTO(
    val id: String,
    val email: String,
    val fullName: String,
    val zipCode: Int,
    val address: String,
    val isBlocked: Boolean,
    val isNeedsPassword: Boolean,
    val isConfirmEmail: Boolean,
    val dateTimeAtCreation: Long,
    val roles: MutableList<String>,
    val hashCode: String
)
