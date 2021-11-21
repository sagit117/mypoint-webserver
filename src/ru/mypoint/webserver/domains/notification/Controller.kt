package ru.mypoint.webserver.domains.notification

import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.*
import io.ktor.client.features.json.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.*
import ru.mypoint.webserver.common.dto.GetAuth
import ru.mypoint.webserver.common.dto.MethodsRequest
import ru.mypoint.webserver.common.dto.RequestToDataBus
import ru.mypoint.webserver.common.dto.createDataBusClient
import ru.mypoint.webserver.domains.notification.dto.TemplateEmailCreateDTO
import ru.mypoint.webserver.domains.users.dto.UserUpdatePasswordDTO

@Suppress("unused") // Referenced in application.conf
fun Application.notificationModule() {
    /** настройки по умолчанию для запроса как клиент */
    val client = createDataBusClient {
        logger = log
        httpClient = HttpClient(CIO) {
            defaultRequest { // this: HttpRequestBuilder ->
                try {
                    host = environment.config.propertyOrNull("databus.host")?.getString() ?: "127.0.0.1"
                    port = environment.config.propertyOrNull("databus.port")?.getString()?.toInt() ?: 8080
                } catch (error: Exception) {
                    log.error(error)
                    host = "127.0.0.1"
                    port = 8080
                }
            }

            install(JsonFeature) {
                serializer = GsonSerializer()
            }
        }
    }

    routing {
        route("/v1/notification") {
            route("/template") {
                post("/email/create") {
                    val token = GetAuth(call).token()

                    val result = client.post<String>(
                        RequestToDataBus(
                            dbUrl = "/v1/templates/email/add",
                            method = MethodsRequest.POST,
                            authToken = token,
                            body = call.receive<TemplateEmailCreateDTO>()
                        ),
                        call
                    )

                    if (result != null) call.respond(HttpStatusCode.OK, result)
                }
            }
        }
    }
}