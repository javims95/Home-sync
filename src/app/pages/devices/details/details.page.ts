import { Component, OnInit } from '@angular/core'
import { Device } from 'src/app/models/devices.model'

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    device: Device = {} as Device

    constructor() {}

    ngOnInit() {
        const navigation = window.history.state
        if (navigation.device) {
            this.device = navigation.device
            console.log(this.device)
        }
    }
}
