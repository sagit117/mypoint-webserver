package ru.mypoint.webserver.common.dto

/**
 * DTO для запроса от веб-сервера
 * @dbUrl - строка запроса к БД сервису
 * @method - метод запроса к БД сервису
 * @authToken - JWT token
 * @body - тело запроса к БД сервису
 */
data class RequestToDataBus(
    val dbUrl: String,
    val method: MethodsRequest? = MethodsRequest.POST,
    val authToken: String?,
    val body: Any?,
)

enum class MethodsRequest {
    POST,
    GET
}
