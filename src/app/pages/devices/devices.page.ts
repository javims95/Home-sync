import { Component, OnInit } from '@angular/core'
import { Device } from 'src/app/models/smart-things.model'
import { GoveeService } from 'src/app/services/govee/govee.service'
import { Router } from '@angular/router'
import { CardComponent } from '../../components/card/card.component'
import { NgFor } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { GlobalStateService } from 'src/app/services/global-state/global-state.service'
import { setSessionStorageItem } from 'src/app/utils/storage'
import { FormsModule } from '@angular/forms'
import { StorageService } from 'src/app/services/storage/storage.service'

@Component({
    selector: 'app-devices',
    templateUrl: './devices.page.html',
    styleUrls: ['./devices.page.scss'],
    standalone: true,
    imports: [IonicModule, NgFor, CardComponent, FormsModule],
})
export class DevicesPage implements OnInit {
    devices: Device[]

    constructor(
        private goveeService: GoveeService,
        private router: Router,
        private globalState: GlobalStateService,
        private storageService: StorageService
    ) {
        // this.notificationsService.scheduleNotification(
        //     'Titulo',
        //     'Cuerpo',
        //     'Descripción larga',
        //     '¡Guay!',
        //     20
        // )
        this.globalState.getAllDevices().subscribe((devices: Device[]) => {
            this.devices = devices
        })
    }

    ngOnInit() {
		// EL SERVICIO PARECE FUNCIONAR, PERO NO DEVUELVE NINGÚN VALOR DEL SENSOR
		// DE TEMPERATURA, ESPERANDO RESPUESTA AL CORREO DE SOPROTE
        // this.goveeService.getAllDevices().then((response) => {
        //     const data = response.data[0]
        //     console.log(data)
        //     const { sku, device, deviceName } = data

        //     this.goveeService.getDeviceStatus(sku, device).subscribe((status) => {
        //         console.log(status)
        //     })
        // })
		console.log();
    }

    handleRefresh(event: any) {
        this.globalState.refreshDevices().subscribe({
            next: (devices: Device[]) => {
                this.devices = devices;
                event.target.complete();
            },
            error: (error) => {
                console.error('Error al obtener los dispositivos:', error);
                event.target.complete();
            }
        });
    }    

    openDetailsPage = (event: Event, device: Device) => {
        // Detener la propagación del evento si se hizo clic en el power-switch
        if (event.target && (event.target as HTMLElement).closest('app-power-switch')) {
            return
        }
		this.storageService.saveItem('currentDeviceName', device.label)
        this.router.navigate([`devices/details/${device.deviceId}/controls`])
    }

    hideOutletDevices = () => {
        this.globalState.filterDevicesWithoutOutlet();
    }

    onToggleHideOutletDevices(event: any) {
        const isChecked = event.detail.checked;
        this.storageService.saveItem('hideOutletDevices', isChecked);
        if (isChecked) {
            this.hideOutletDevices();
        } else {
            this.globalState.refreshDevices().subscribe((devices: Device[]) => {
                this.devices = devices;
            });
        }
    }
}
