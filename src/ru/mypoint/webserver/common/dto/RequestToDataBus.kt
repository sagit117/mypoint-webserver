package ru.mypoint.webserver.common.dto

/**
 * DTO для запроса от вебсервера
 * @dbUrl - строка запроса к БД сервису
 * @method - метод запроса к БД сервису
 * @authToken - JWT token
 * @body - тело запроса к БД сервису
 */
data class RequestToDataBus(
    val dbUrl: String,
    val method: MethodsRequest,
    val authToken: String?,
    val body: String?,
)

enum class MethodsRequest {
    POST,
    GET
}
