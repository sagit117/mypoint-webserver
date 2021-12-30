package ru.mypoint.webserver.common

import java.text.SimpleDateFormat
import java.util.*
import kotlin.reflect.KProperty1

/** Генератор хэш-кода */
fun randomCode(length: Int): String {
    val charPool : List<Char> = ('a'..'z') + ('A'..'Z') + ('0'..'9')

    return (1..length)
        .map { kotlin.random.Random.nextInt(0, charPool.size) }
        .map(charPool::get)
        .joinToString("");
}

/** Чтение свойств класса в runtime */
@Suppress("UNCHECKED_CAST")
fun <R> readInstanceProperty(instance: Any, propertyName: String): R {
    val property = instance::class.members.first { it.name == propertyName } as KProperty1<Any, *>
    return property.get(instance) as R
}

fun convertLongToTime(time: Long, format: String): String {
    val date = Date(time)
    val dateFormat = SimpleDateFormat(format)
    return dateFormat.format(date)
}