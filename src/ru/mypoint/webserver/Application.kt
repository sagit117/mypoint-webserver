package ru.mypoint.webserver

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.features.*
import org.slf4j.event.*
import io.ktor.auth.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.*
import io.ktor.client.features.json.*
import io.ktor.client.request.*
import io.ktor.gson.*
import io.ktor.http.content.*
import io.ktor.sessions.*
import io.ktor.util.*
import org.w3c.dom.Attr
import ru.mypoint.webserver.common.dto.CheckAccessDTO
import ru.mypoint.webserver.common.dto.CreateDataBusClient
import ru.mypoint.webserver.common.dto.GetAuth
import ru.mypoint.webserver.common.dto.createDataBusClient
import ru.mypoint.webserver.domains.users.UserSession

fun main(args: Array<String>): Unit = io.ktor.server.jetty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(_testing: Boolean = false) {
    install(Compression) {
        gzip {
            priority = 1.0
        }
        deflate {
            priority = 10.0
            minimumSize(1024) // condition
        }
    }

    install(CallLogging) {
        level = Level.INFO
        format { call ->
            val status = call.response.status()
            val httpMethod = call.request.httpMethod.value
            val userAgent = call.request.headers["User-Agent"]
            val uri = call.request.uri

            "Status: $status, HTTP method: $httpMethod, User agent: $userAgent, uri: $uri"
        }
    }

    install(CORS) {
        method(HttpMethod.Options)
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.AccessControlAllowHeaders)
        header(HttpHeaders.ContentType)
        header(HttpHeaders.AccessControlAllowOrigin)
//        header("MyCustomHeader")
//        allowCredentials = true
        anyHost() // @TODO: Don't do this in production if possible. Try to limit it.
    }

    install(Authentication) {
    }

    install(ContentNegotiation) {
        gson {
        }
    }

    install(Sessions) {
        val maxAgeInSeconds = environment.config.propertyOrNull("application.cookie.maxAgeInSeconds")?.getString()

        cookie<UserSession>("user_session") {
            cookie.path = "/"
            cookie.maxAgeInSeconds = maxAgeInSeconds?.toLong() ?: 2_592_000L
            cookie.httpOnly = true
            cookie.extensions["SameSite"] = "lax"
        }
    }

    install(DefaultHeaders) {
        header("Service-Worker-Allowed", "/")
//        header("Cache-Control", "max-age=31536000")
        header("Cache-Control", "no-cache")
    }

//    install(DoubleReceive)
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
                serializer = GsonSerializer {

                }
            }
        }
    }

    routing {
        static("/static") {
            resources("/css")
            resources("/image")
            resources("/js")
            resources("/pwa")
        }

        intercept(ApplicationCallPipeline.Features) {
            if (!call.request.uri.startsWith("/static")) {
                /** Очищаем маршрут от параметров */
                val routeDropQueryString = if (call.request.queryString().isNotEmpty()) {
                    call.request.uri.dropLast(call.request.queryString().length + 1)
                } else {
                    call.request.uri
                }

                val routeFragment = routeDropQueryString.split("/")
                val valueParams = call.parameters.flattenEntries().map { pair -> pair.second }

                val clearRoute = routeFragment.filter { v ->
                    !valueParams.contains(v)
                }.joinToString("/")

                /** Проверяем доступ */
                val token = GetAuth(call).token()

                val result = client.checkAccess<String>(
                    CheckAccessDTO(
                        url = clearRoute,
                        token = token,
                        body = null
                    ),
                    call
                )

                if (result != null) {
                    call.attributes.put(KeyAttributesForCall.keyAccessIsAllowed, true)
                    call.attributes.put(KeyAttributesForCall.keyToken, token.toString())
                    call.attributes.put(KeyAttributesForCall.keyDataBusClient, client)
                } else {
                    call.attributes.put(KeyAttributesForCall.keyAccessIsAllowed, false)
                }

                proceed()
            }
        }
    }

    ConfigApp.title = environment.config.propertyOrNull("application.title")?.getString() ?: ""
    ConfigApp.leftSideMenuFooterTitle = environment.config.propertyOrNull("application.leftSideMenuFooterTitle")?.getString() ?: ""
}

object ConfigApp {
    var title: String = ""
    var leftSideMenuFooterTitle: String = ""
}

/** Объект хранит ключи для передачи атрибутов в вызовах */
object KeyAttributesForCall {
    val keyAccessIsAllowed = AttributeKey<Boolean>("accessIsAllowed")
    val keyToken = AttributeKey<String>("token")
    val keyDataBusClient = AttributeKey<CreateDataBusClient>("dataBusClient")
}

