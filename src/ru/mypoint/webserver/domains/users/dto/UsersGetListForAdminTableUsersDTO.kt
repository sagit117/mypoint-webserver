package ru.mypoint.webserver.domains.users.dto

import ru.mypoint.webserver.domains.users.UserRepository

data class UsersGetListForAdminTableUsersDTO(val users: List<UserRepository>, val count: Int)
