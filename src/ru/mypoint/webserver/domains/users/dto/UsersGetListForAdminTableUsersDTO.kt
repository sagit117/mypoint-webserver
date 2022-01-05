package ru.mypoint.webserver.domains.users.dto

import ru.mypoint.webserver.domains.users.UserRepositoryForUsersTable

data class UsersGetListForAdminTableUsersDTO(val users: List<UserRepositoryForUsersTable>, val count: Int)
