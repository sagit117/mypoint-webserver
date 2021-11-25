package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*

fun inputBlock(init: Input.() -> Unit): Input {
    val objectInput = Input()
    objectInput.init()
    return objectInput
}

class Input: Template<FlowContent> {
    lateinit var inputId: String
    lateinit var inputType: InputType
    lateinit var caption: String

    override fun FlowContent.apply() {
        div {
            classes = setOf("input_wrapper")
            label {
                +caption
            }
            input {
                id = inputId
                type = inputType
            }
        }
    }
}