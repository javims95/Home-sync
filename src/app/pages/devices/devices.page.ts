import { Component, OnInit } from '@angular/core'
import { Device, DevicesResponse } from 'src/app/models/devices.model'
import { SmartThingsService } from 'src/app/services/smart-things/smart-things.service'
import { DEVICES } from './conf/constants'

@Component({
    selector: 'app-devices',
    templateUrl: './devices.page.html',
    styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
    devices: Device[]

    constructor(private smartthingsService: SmartThingsService) {
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
                            this.devices[index].status = status // Asumiendo que el estado se almacena en un campo 'status' dentro de cada objeto de dispositivo
                        })

                        // Comprobar y obtener la descripción si el label es 'tele'
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
        // Llama a tu función de actualización aquí
        console.log('Actualizando...')

        // Simula una operación de actualización asincrónica
        setTimeout(() => {
            // Any calls to load data go here
            event.target.complete()
        }, 2000)
    }
}
