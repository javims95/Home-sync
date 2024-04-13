import { Component, OnInit } from '@angular/core'
import { Device, DevicesResponse } from 'src/app/models/smart-things.model'
import { SmartThingsService } from 'src/app/services/smart-things/smart-things.service'
import { DEVICES } from './conf/constants'
import { GoveeService } from 'src/app/services/govee/govee.service'
import { Router } from '@angular/router'
import { CardComponent } from '../../components/card/card.component'
import { NgFor } from '@angular/common'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'app-devices',
    templateUrl: './devices.page.html',
    styleUrls: ['./devices.page.scss'],
    standalone: true,
    imports: [IonicModule, NgFor, CardComponent],
})
export class DevicesPage implements OnInit {
    devices: Device[]

    constructor(
        private smartthingsService: SmartThingsService,
        private goveeService: GoveeService,
        private router: Router
    ) {
        // this.notificationsService.scheduleNotification(
        //     'Titulo',
        //     'Cuerpo',
        //     'Descripción larga',
        //     '¡Guay!',
        //     20
        // )
        this.devices = []
    }

    ngOnInit() {
        this.goveeService.getAllDevices().then((response) => {
            const data = response.data[0]
            console.log(data)
            const { sku, device, deviceName } = data

            this.goveeService.getDeviceStatus(sku, device).subscribe((status) => {
                console.log(status)
            })
        })
        this.getSmartThingsDevices()
    }

    getSmartThingsDevices = async () => {
        this.smartthingsService
            .getDevices()
            .then((res: DevicesResponse) => {
                this.devices = res.items

                // Crear un array de promesas para obtener el estado de cada dispositivo
                const statusPromises = this.devices.map((device) => {
                    return this.smartthingsService.getStatus(device.deviceId)
                })

                // Ejecutar todas las promesas y actualizar el estado de cada dispositivo
                Promise.all(statusPromises)
                    .then((statuses) => {
                        statuses.forEach((status, index) => {
                            this.devices[index].status = status
                        })

                        // Comprobar y obtener la descripción si es el televisor
                        this.devices.forEach((device, index) => {
                            if (
                                device.deviceTypeName?.includes(DEVICES.SAMSUNG) ||
                                device.deviceTypeName?.includes(DEVICES.TV)
                            ) {
                                this.smartthingsService
                                    .getDescription(device.deviceId)
                                    .then((currentTVContent) => {
                                        this.devices[index].currentTVContent =
                                            this.getCurrentTVContent(
                                                currentTVContent.components.main.tvChannel
                                                    .tvChannelName.value
                                            )
                                    })
                                    .catch((error) => {
                                        console.error(
                                            'Error obteniendo la descripción del dispositivo:',
                                            error
                                        )
                                    })
                            }
                        })
                    })
                    .catch((error) => {
                        console.error('Error obteniendo el estado de los dispositivos:', error)
                    })
            })
            .catch((error) => {
                console.error('Error obteniendo los dispositivos:', error)
            })
    }

    getCurrentTVContent = (tvChannelName: string): string => {
        const parts = tvChannelName.split('.')
        const lastValue = parts[parts.length - 1]
        return DEVICES.SEEING + lastValue
    }

    handleRefresh(event: any) {
        this.getSmartThingsDevices().then(event.target.complete())
    }

    openDetailsPage = (event: Event, device: Device) => {
        // Detener la propagación del evento si se hizo clic en el power-switch
        if (event.target && (event.target as HTMLElement).closest('app-power-switch')) {
            return
        }

        this.router.navigate([`devices/details/${device.deviceId}/controls`], {
            state: { device: device },
        })
    }
}
