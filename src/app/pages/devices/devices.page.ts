import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-devices',
    templateUrl: './devices.page.html',
    styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
    constructor() {
        // this.notificationsService.scheduleNotification(
        //     'Titulo',
        //     'Cuerpo',
        //     'Descripción larga',
        //     '¡Guay!',
        //     20
        // )
    }

    ngOnInit() {
        console.log('')
    }
}
