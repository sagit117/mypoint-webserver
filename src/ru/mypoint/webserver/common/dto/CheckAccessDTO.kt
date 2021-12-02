package ru.mypoint.webserver.common.dto

data class CheckAccessDTO(val url: String, val body: String?, val token: String?)
