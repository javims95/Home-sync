import { Component } from '@angular/core'
import { Capacitor } from '@capacitor/core'
import { Platform } from '@ionic/angular'
import OneSignal from 'onesignal-cordova-plugin'

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor() {
        if (Capacitor.getPlatform() != 'web') {
            OneSignal.initialize('1d9d45e6-446e-42e4-bb3d-b7243357822a')

            OneSignal.Notifications.addEventListener('click', async (e) => {
                let clickData = await e.notification
                console.log('Notification Clicked : ' + clickData)
            })

            OneSignal.Notifications.requestPermission(true).then(
                (success: Boolean) => {
                    console.log('Notification permission granted ' + success)
                }
            )
        }
    }
}
