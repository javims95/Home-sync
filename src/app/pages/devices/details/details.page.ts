import { Component } from '@angular/core'
import { Device } from 'src/app/models/smart-things.model'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
    standalone: true,
    imports: [IonicModule],
})
export class DetailsPage {
    device: Device = {} as Device
    deviceId: string

    constructor() {}
}
