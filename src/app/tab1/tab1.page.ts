import { Component } from '@angular/core'
import {
    CancelOptions,
    Channel,
    LocalNotifications,
    ScheduleOptions,
} from '@capacitor/local-notifications'

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
    constructor() {}

    scheduleNotification = async () => {
        let options: ScheduleOptions = {
            notifications: [
                {
                    id: 2,
                    title: 'Título',
                    body: 'Esto es el cuerpo',
                    largeBody:
                        'Esto es otro texto aún mas largo, para cuando se despliegue la notificación',
                    summaryText: '¡Algo más!',
                    largeIcon: 'res://mipmap-hdpi/ic_launcher_round',
                    smallIcon: 'res://mipmap-hdpi/ic_launcher_round',
                    // channelId: 'channel1'
                },
            ],
        }

        try {
            await LocalNotifications.schedule(options)
        } catch (error) {
            alert(JSON.stringify(error))
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
