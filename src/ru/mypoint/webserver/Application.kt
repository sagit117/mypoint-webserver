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

fun main(args: Array<String>): Unit = io.ktor.server.jetty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
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
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.Authorization)
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
//        cookie<UserSession>("user_session") {
//            cookie.path = "/"
//            cookie.maxAgeInSeconds = 2_592_000 // 30 days
//            cookie.httpOnly = true
//            cookie.extensions["SameSite"] = "lax"
//        }
//        cookie<UserID>("user_id") {
//            cookie.path = "/"
//            cookie.maxAgeInSeconds = Config.lifeTimeUserID // 1h
//            cookie.httpOnly = true
//            cookie.extensions["SameSite"] = "lax"
//        }
    }

    routing {
        static("static") {
            resources("css")
            resources("image")
            resources("js/")
        }
    }

//    val client = HttpClient(CIO) {
//        install(JsonFeature) {
//            serializer = GsonSerializer()
//        }
//    }
//    runBlocking {
//        // Sample for making a HTTP Client request
//        /*
//        val message = client.post<JsonSampleClass> {
//            url("http://127.0.0.1:8080/path/to/endpoint")
//            contentType(ContentType.Application.Json)
//            body = JsonSampleClass(hello = "world")
//        }
//        */
//    }

    routing {
        get("/ping") {
            call.respond(HttpStatusCode.OK, mapOf("status" to "OK"))
        }
    }
}

