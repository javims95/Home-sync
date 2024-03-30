import { Injectable } from '@angular/core'
import {
    CancelOptions,
    Channel,
    LocalNotifications,
    ScheduleOptions,
} from '@capacitor/local-notifications'

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    constructor() {}

    sendNotification = async (
        title: string,
        body: string,
        largeBody: string,
        summaryText: string
    ) => {
        let options: ScheduleOptions = {
            notifications: [
                {
                    id: 2,
                    title: title,
                    body: body,
                    largeBody: largeBody,
                    summaryText: summaryText,
                    largeIcon: 'res://mipmap-hdpi/ic_launcher_round',
                    smallIcon: 'res://mipmap-hdpi/ic_launcher_round',
                    // channelId: 'channel1'
                },
            ],
        }

        try {
            await LocalNotifications.schedule(options)
        } catch (error) {
            alert('Error ' + JSON.stringify(error))
        }
    }

    scheduleNotification = async (
        title: string,
        body: string,
        largeBody: string,
        summaryText: string,
        timerInSeconds: number
    ) => {
        let options: ScheduleOptions = {
            notifications: [
                {
                    id: 2,
                    title: title,
                    body: body,
                    largeBody: largeBody,
                    summaryText: summaryText,
                    largeIcon: 'res://mipmap-hdpi/ic_launcher_round',
                    smallIcon: 'res://mipmap-hdpi/ic_launcher_round',
                    // channelId: 'channel1'
                },
            ],
        }

        try {
            await new Promise((resolve) =>
                setTimeout(resolve, timerInSeconds * 1000)
            )
            await LocalNotifications.schedule(options)
        } catch (error) {
            alert('Error ' + JSON.stringify(error))
        }
    }

    cancelNotification = async () => {
        let options: CancelOptions = {
            notifications: [{ id: 1 }],
        }
        await LocalNotifications.cancel(options)
    }

    removeAllDeliveredNotifications = async () => {
        await LocalNotifications.removeAllDeliveredNotifications()
    }

    // Sirve para crear varios modos de sonidos para las notificaciones
    createChannel = async () => {
        let chanel1: Channel = {
            id: 'channel1',
            description: 'first channel',
            name: 'Channel 1',
            visibility: 1,
        }

        try {
            await LocalNotifications.createChannel(chanel1)
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }
}
