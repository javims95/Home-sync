import { Component, OnInit } from '@angular/core'
import { Device } from 'src/app/models/devices.model'
import { IonicModule } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
    standalone: true,
    imports: [IonicModule],
})
export class DetailsPage implements OnInit {
    device: Device = {} as Device
    deviceId: string

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        const navigation = window.history.state
        if (navigation.device) {
            this.device = navigation.device
        }
    }
}
