import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SmartThingsService } from 'src/app/services/smart-things/smart-things.service'

@Component({
    selector: 'app-power-switch',
    templateUrl: './power-switch.component.html',
    styleUrls: ['./power-switch.component.scss'],
    standalone: true,
})
export class PowerSwitchComponent {
    @Input() index: number = 0
    @Input() checked: boolean = false
    @Input() deviceId: string = ''

    constructor(private smartthingsService: SmartThingsService) {}

    toggleDevice = async () => {
        try {
            await this.smartthingsService.toggleDevice(this.deviceId)
        } catch (error) {
            this.reverseButtonState()
            console.log(error)
        }
    }

    reverseButtonState = () => {
        const inputElement = window.document.querySelector(
            `input[data-deviceId="${this.deviceId}"]`
        ) as HTMLInputElement
        inputElement && (inputElement.checked = !inputElement.checked)
    }
}
