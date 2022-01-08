package ru.mypoint.webserver.domains.front

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*

@Suppress("unused") // Referenced in application.conf
fun Application.rootModule() {
    routing {
        route("/") {
            get {
                call.respond(HttpStatusCode.OK, mapOf("status" to "ok"))
            }
        }

        get("/ping") {
            call.respond(HttpStatusCode.OK, mapOf("status" to "OK"))
        }

        get("/offline") {
            call.respond(HttpStatusCode.OK, mapOf("status" to "offline"))
        }
    }
}