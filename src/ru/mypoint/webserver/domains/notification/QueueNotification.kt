package ru.mypoint.webserver.domains.notification

import kotlinx.coroutines.*
import ru.mypoint.webserver.domains.notification.dto.SendNotificationDTO
import ru.mypoint.webserver.domains.users.dto.EmailDTO

data class DataForQueueNotification(
    val emailDTO: EmailDTO,
    val sendNotificationDTO: SendNotificationDTO,
    val hash: String,
    val dateTimeAtCreation: Long? = System.currentTimeMillis(),
    val expiredMS: Long? = 3_600_000 // время жизни в мс
)

/**
 * Очередь оповещений пользователя
 */
object QueueNotification {
    private val queue = HashMap<String, DataForQueueNotification>()

    fun addItemQueue(dataForQueueNotification: DataForQueueNotification): Boolean {
        val findQueue = getWithEmail(dataForQueueNotification.emailDTO)

        /** если очередь с пользователем и типом оповещения уже создана, возвращаем false */
        return if (findQueue == null || findQueue.sendNotificationDTO.type != dataForQueueNotification.sendNotificationDTO.type) {
            queue[dataForQueueNotification.hash] = dataForQueueNotification

            removeTimer(dataForQueueNotification)

            true
        } else {
            false
        }
    }

    fun getWithHash(hash: String): DataForQueueNotification? {
        return queue[hash]
    }

    private fun getWithEmail(emailDTO: EmailDTO): DataForQueueNotification? {
        queue.forEach { q -> if (q.value.emailDTO.email == emailDTO.email) return q.value }

        return null
    }

    private fun removeQueueWithHash(hash: String) {
        queue.remove(hash)
    }

    /** поставить удаление через таймер */
    @OptIn(DelicateCoroutinesApi::class)
    private fun removeTimer(dataForQueueNotification: DataForQueueNotification) {
        GlobalScope.launch {
            dataForQueueNotification.expiredMS?.let { delay(it) }
            removeQueueWithHash(dataForQueueNotification.hash)
        }
    }
}