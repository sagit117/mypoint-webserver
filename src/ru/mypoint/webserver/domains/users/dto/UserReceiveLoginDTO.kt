package ru.mypoint.webserver.domains.users.dto

/** класс для приема данных при логине */
data class UserReceiveLoginDTO(val user: Any, val token: String)
