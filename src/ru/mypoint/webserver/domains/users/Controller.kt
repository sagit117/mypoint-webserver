package ru.mypoint.webserver.domains.users

import com.google.gson.Gson
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
import ru.mypoint.webserver.common.dto.*
import ru.mypoint.webserver.domains.users.dto.UserRegistryDTO

@Suppress("unused") // Referenced in application.conf
fun Application.userModule() {
    /** настройки по умолчанию для запроса как клиент */
    val client = CreateDataBusClient(
        log,
        HttpClient(CIO) {
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
    )

    routing {
        route("/users") {
            post("/registry") {
                val userRegistryDTO = call.receive<UserRegistryDTO>()

                val result = client.post<Any>(
                    RequestToDataBus(
                        dbUrl = "/v1/users/add",
                        method = MethodsRequest.POST,
                        authToken = null,
                        body = Gson().toJson(userRegistryDTO)
                    ),
                    call
                )

                if (result != null) call.respond(HttpStatusCode.OK)
            }


        }
    }
}