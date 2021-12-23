package ru.mypoint.webserver.common

/** Пути к БД */
enum class DbUrls(val value: String) {
    UsersGetAll("/v1/users/get/all"),
    UsersAdd("/v1/users/add"),
    UsersGet("/v1/users/get"),
    UsersUpdatePassword("/v1/users/update/password"),
    UserUpdateData("/v1/users/update/data"),
    TemplatesEmailAdd("/v1/templates/email/add")
}