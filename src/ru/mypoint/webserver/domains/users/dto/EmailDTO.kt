package ru.mypoint.webserver.domains.users.dto

import java.util.regex.Pattern

data class EmailDTO(var email: String) {
    init {
        /** валидация email */
        if (!isCorrectEmail()) {
            throw IllegalArgumentException("Email required")
        }

        email = email.trim().lowercase()
    }

    fun isCorrectEmail(): Boolean {
        val emailPattern = Pattern.compile(
            "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" +
                    "\\@" +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                    "(" +
                    "\\." +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
                    ")+"
        )

        return emailPattern.matcher(email.trim().lowercase()).matches()
    }
}
