package ru.mypoint.webserver.common.dto

import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.features.*
import io.ktor.client.request.*
import io.ktor.client.utils.*
import io.ktor.http.*
import io.ktor.response.*
import org.slf4j.Logger
import ru.mypoint.webserver.domains.users.dto.UserLoginDTO
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
        return try {
            httpClient.post<T> {
                url("/webserver/dbservice/request")
                contentType(ContentType.Application.Json)
                body = bodyRequest
            }
        } catch (error: Throwable) {
            respondError(error, call)
            null
        }
    }

    suspend inline fun <reified T> login(userLoginDTO: UserLoginDTO, call: ApplicationCall): T? {
        return try {
            httpClient.post<T> {
                url("/webserver/login")
                contentType(ContentType.Application.Json)
                body = userLoginDTO
            }
        } catch (error: Throwable) {
            respondError(error, call)
            null
        }
    }

    suspend fun respondError(error: Throwable, call: ApplicationCall) {
        when(error) {
            is ClientRequestException -> {
                when (error.response.status.value) {
                    400 -> {
                        call.respond(
                            HttpStatusCode.BadRequest,
                            ResponseStatusDTO(ResponseStatus.BadRequest.value)
                        )
                        return
                    }
                    401 -> {
                        call.respond(
                            HttpStatusCode.Unauthorized,
                            ResponseStatusDTO(ResponseStatus.Unauthorized.value)
                        )
                        return
                    }
                    404 -> {
                        call.respond(HttpStatusCode.NotFound)
                        return
                    }
                    409 -> {
                        call.respond(
                            HttpStatusCode.Conflict,
                            ResponseStatusDTO(ResponseStatus.Conflict.value)
                        )
                        return
                    }
                    500 -> {
                        call.respond(
                            HttpStatusCode.InternalServerError,
                            ResponseStatusDTO(ResponseStatus.InternalServerError.value)
                        )
                        return
                    }

                    else -> logger.error(error.toString())
                }
            }
            is ConnectException -> {
                call.respond(
                    HttpStatusCode.ServiceUnavailable,
                    ResponseStatusDTO(ResponseStatus.ServiceUnavailable.value)
                )
                return 
            }

            else -> logger.error(error.toString())
        }

        call.respond(HttpStatusCode.BadRequest, ResponseStatusDTO(ResponseStatus.NoValidate.value))
    }
}