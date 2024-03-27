import { Component, OnInit } from '@angular/core'
import { NotificationsService } from '../services/notifications/notifications.service'

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
    constructor(private notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this.notificationsService.scheduleNotification(
            'Titulo',
            'Cuerpo',
            'Descripción larga',
            '¡Guay!',
            20
        )
    }
}
