package ru.mypoint.webserver.common.dto

import io.ktor.application.*
import io.ktor.sessions.*
import ru.mypoint.webserver.domains.users.UserSession

/**
 * Получаем токен или из куки или из заголовка
 */
class GetAuth(private val call: ApplicationCall) {
    fun token(): String? {
        return call.sessions.get<UserSession>()?.token
            ?: call.request.headers["Authorization"]?.drop("Bearer ".length)
    }
}