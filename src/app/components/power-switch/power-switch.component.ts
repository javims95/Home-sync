import { Component, Input, OnInit } from '@angular/core'
import { SmartThingsService } from 'src/app/services/smart-things/smart-things.service'

@Component({
    selector: 'app-power-switch',
    templateUrl: './power-switch.component.html',
    styleUrls: ['./power-switch.component.scss'],
})
export class PowerSwitchComponent implements OnInit {
    @Input() index: number = 0
    @Input() checked: boolean = false
    @Input() deviceId: string = ''

    constructor(private smartthingsService: SmartThingsService) {}

    ngOnInit() {
        console.log()
    }

    toggleDevice = async () => {
        try {
            await this.smartthingsService.toggleDevice(this.deviceId)
        } catch (error) {
            console.log(error)
        }
    }
}
