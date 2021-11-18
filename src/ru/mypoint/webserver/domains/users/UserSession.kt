package ru.mypoint.webserver.domains.users

import io.ktor.auth.*

/** класс хранилище для cookie */
data class UserSession(val token: String): Principal
