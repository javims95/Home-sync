import { Component, OnInit } from '@angular/core'
import { Device, DevicesResponse } from 'src/app/models/devices.model'
import { SmartThingsService } from 'src/app/services/smart-things/smart-things.service'

@Component({
    selector: 'app-devices',
    templateUrl: './devices.page.html',
    styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
    devices: Device[]

    constructor(private smartthinSgService: SmartThingsService) {
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
        this.smartthinSgService
            .getDevices()
            .then((res: DevicesResponse) => {
                this.devices = res.items

                // Crear un array de promesas para obtener el estado de cada dispositivo
                const statusPromises = this.devices.map((device) => {
                    return this.smartthinSgService.getStatus(device.deviceId)
                })

                // Ejecutar todas las promesas y actualizar el estado de cada dispositivo
                Promise.all(statusPromises)
                    .then((statuses) => {
                        statuses.forEach((status, index) => {
                            this.devices[index].status = status // Asumiendo que el estado se almacena en un campo 'status' dentro de cada objeto de dispositivo
                        })
                    })
                    .catch((error) => {
                        console.error(
                            'Error obteniendo el estado de los dispositivos:',
                            error
                        )
                    })
            })
            .catch((error) => {
                console.error('Error obteniendo los dispositivos:', error)
            })
    }
}
