package ru.mypoint.webserver.common.dto

/** Класс для получения лимитированных списков данных */
data class GetListWithLimit(val limit: Int, val skip: Int)
