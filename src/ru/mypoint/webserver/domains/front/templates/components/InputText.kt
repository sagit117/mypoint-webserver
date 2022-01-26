package ru.mypoint.webserver.domains.front.templates.components

import io.ktor.html.*
import kotlinx.html.*

fun inputTextBlock(init: InputText.() -> Unit): InputText {
    val objectInput = InputText()
    objectInput.init()
    return objectInput
}

class InputText: Template<FlowContent> {
    var inputId: String = ""
    lateinit var inputType: InputType
    var caption: String = ""
    var inputName: String = ""
    var extClass: String? = ""
    var inputValue: String = ""
    var inputDisabled: Boolean = false

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
                name = inputName
                value = inputValue
                disabled = inputDisabled
            }
            small {
                id = inputId + "_msg"
            }
        }
    }
}