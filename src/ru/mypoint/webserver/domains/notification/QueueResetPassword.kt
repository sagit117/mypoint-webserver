package ru.mypoint.webserver.domains.notification

import kotlinx.coroutines.*
import ru.mypoint.webserver.domains.notification.dto.SendNotificationDTO
import ru.mypoint.webserver.domains.users.dto.EmailDTO

data class DataForQueueResetPassword(
    val emailDTO: EmailDTO,
    val sendNotificationDTO: SendNotificationDTO,
    val hash: String,
    val intervalAddMC: Long = 120_000L, // интервал блокировки добавления
    val dateTimeAtCreation: Long? = System.currentTimeMillis(),
    val expiredMS: Long? = 3_600_000L, // время жизни в мс
    val removeTimer: Job? = null
)

/**
 * Очередь пользователей для сбросов пароля
 */
object QueueResetPassword {
    private val queue = HashMap<String, DataForQueueResetPassword>()

    fun addItemQueue(dataForQueueResetPassword: DataForQueueResetPassword): Boolean {
        val findQueue = getWithEmail(dataForQueueResetPassword.emailDTO)

        /**
         * Если очередь с пользователем и типом оповещения уже создана, возвращаем false,
         * но если оповещение пришло позднее расчетного (дата создания + intervalAddMC), тогда создаем и возвращаем true
         */
        return if (
            findQueue == null
            || findQueue.sendNotificationDTO.type != dataForQueueResetPassword.sendNotificationDTO.type
            || findQueue.sendNotificationDTO.templateName != dataForQueueResetPassword.sendNotificationDTO.templateName
        ) {
            put(dataForQueueResetPassword)

            true
        } else {
            val queue = getWithEmail(dataForQueueResetPassword.emailDTO)

            if ((System.currentTimeMillis() - queue?.dateTimeAtCreation!!) > queue.intervalAddMC) {
                getHashWithEmail(dataForQueueResetPassword.emailDTO)?.let { removeQueueWithHash(it) }
                put(dataForQueueResetPassword)

                true
            } else {
                false
            }
        }
    }

    private fun put(dataForQueueResetPassword: DataForQueueResetPassword) {
        queue[dataForQueueResetPassword.hash] = dataForQueueResetPassword.copy(removeTimer = removeTimer(dataForQueueResetPassword))
    }

    fun getWithHash(hash: String): DataForQueueResetPassword? {
        return queue[hash]
    }

    private fun getWithEmail(emailDTO: EmailDTO): DataForQueueResetPassword? {
        queue.forEach { q -> if (q.value.emailDTO.email == emailDTO.email) return q.value }

        return null
    }

    private fun getHashWithEmail(emailDTO: EmailDTO): String? {
        queue.forEach { q -> if (q.value.emailDTO.email == emailDTO.email) return q.key }

        return null
    }

    private fun removeQueueWithHash(hash: String) {
        queue[hash]?.removeTimer?.cancel()
        queue.remove(hash)
    }

    /** Поставить удаление через таймер */
    @OptIn(DelicateCoroutinesApi::class)
    private fun removeTimer(dataForQueueResetPassword: DataForQueueResetPassword): Job {
        return GlobalScope.launch {
            dataForQueueResetPassword.expiredMS?.let { delay(it) }
            removeQueueWithHash(dataForQueueResetPassword.hash)
        }
    }
}