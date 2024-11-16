import { Component, Input, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { DeviceIcon } from 'src/app/models/device-icon'
import { StorageService } from 'src/app/services/storage/storage.service'
import { PowerSwitchComponent } from '../power-switch/power-switch.component'
import { NgIf } from '@angular/common'

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: true,
    imports: [IonicModule, PowerSwitchComponent, NgIf],
})
export class CardComponent implements OnInit {
    @Input() device: any
    @Input() index: number
    icon: string;

    constructor(private storageService: StorageService) {}

    async ngOnInit() {
        await this.loadDeviceIcon()
    }

    async loadDeviceIcon() {
        const savedIcons: DeviceIcon[] = (await this.storageService.getItem('deviceIcons')) || []
        const savedIcon = savedIcons.find((icon) => icon.deviceId === this.device.deviceId)
		this.icon = savedIcon ? savedIcon.icon : 'default.svg'
    }

    // Método para obtener la ruta del icono
    getIconPath(icon: string): string {
        return `/assets/devices-icons/${icon}`
    }
}
