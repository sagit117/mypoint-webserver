package ru.mypoint.webserver

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.features.*
import org.slf4j.event.*
import io.ktor.auth.*
import io.ktor.gson.*
import io.ktor.http.content.*
import io.ktor.sessions.*
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
        allowCredentials = true
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

    routing {
        static("static") {
            resources("css")
            resources("image")
            resources("js")
        }
    }

    routing {
        get("/ping") {
            call.respond(HttpStatusCode.OK, mapOf("status" to "OK"))
        }
    }

    ConfigApp.title = environment.config.propertyOrNull("application.title")?.getString() ?: ""
    ConfigApp.leftSideMenuFooterTitle = environment.config.propertyOrNull("application.leftSideMenuFooterTitle")?.getString() ?: ""
}

object ConfigApp {
    var title: String = ""
    var leftSideMenuFooterTitle: String = ""
}

