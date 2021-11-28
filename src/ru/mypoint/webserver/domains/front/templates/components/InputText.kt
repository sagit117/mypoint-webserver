package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*

fun inputTextBlock(init: InputText.() -> Unit): InputText {
    val objectInput = InputText()
    objectInput.init()
    return objectInput
}

class InputText: Template<FlowContent> {
    lateinit var inputId: String
    lateinit var inputType: InputType
    lateinit var caption: String
    var extClass: String? = ""

    override fun FlowContent.apply() {
        div {
            classes = setOf("input_wrapper", extClass ?: "")

            label {
                htmlFor = inputId
                +caption
            }
            input {
                id = inputId
                type = inputType
                classes = setOf("input_text")
            }
            small {
                id = inputId + "_msg"
            }
        }
    }
}