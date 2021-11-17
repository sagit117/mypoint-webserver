package ru.mypoint.webserver.common.dto

import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.features.*
import io.ktor.client.request.*
import io.ktor.client.utils.*
import io.ktor.http.*
import io.ktor.response.*
import org.slf4j.Logger
import java.net.ConnectException

fun createDataBusClient(init: CreateDataBusClient.() -> Unit): CreateDataBusClient {
    val client = CreateDataBusClient()
    client.init()
    return client
}

/**
 * Создаем HTTP клиента для data bus
 */
class CreateDataBusClient() {
    lateinit var logger: Logger
    lateinit var httpClient: HttpClient

    suspend inline fun <reified T> post(bodyRequest: Any = EmptyContent, call: ApplicationCall): T? {
        try {
            return httpClient.post<T> {
                url("/webserver/dbservice/request")
                contentType(ContentType.Application.Json)
                body = bodyRequest
            }
        } catch (error: Throwable) {
            when(error) {
                is ClientRequestException -> {
                    when (error.response.status.value) {
                        404 -> {
                            call.respond(HttpStatusCode.NotFound)
                            return null
                        }
                        409 -> {
                            call.respond(
                                HttpStatusCode.Conflict,
                                ResponseStatusDTO(ResponseStatus.Conflict.value)
                            )
                            return null
                        }
                        500 -> {
                            call.respond(
                                HttpStatusCode.InternalServerError,
                                ResponseStatusDTO(ResponseStatus.InternalServerError.value)
                            )
                            return null
                        }

                        else -> logger.error(error.toString())
                    }
                }
                is ConnectException -> {
                    call.respond(
                        HttpStatusCode.ServiceUnavailable,
                        ResponseStatusDTO(ResponseStatus.ServiceUnavailable.value)
                    )
                    return null
                }

                else -> logger.error(error.toString())
            }

            call.respond(HttpStatusCode.BadRequest, ResponseStatusDTO(ResponseStatus.NoValidate.value))
            return null
        }
    }
}