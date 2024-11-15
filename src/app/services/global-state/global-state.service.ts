import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Device, DevicesResponse } from 'src/app/models/smart-things.model'
import { SmartThingsService } from 'src/app/services/smart-things/smart-things.service'
import { StorageService } from '../storage/storage.service'

const DEVICES = {
    SAMSUNG: 'Samsung',
    TV: 'TV',
    SEEING: 'Viendo: ',
}

@Injectable({
    providedIn: 'root',
})
export class GlobalStateService {
    private devicesSubject = new BehaviorSubject<Device[]>([])
    devices$ = this.devicesSubject.asObservable()

    constructor(
        private smartthingsService: SmartThingsService,
        private storageService: StorageService
    ) {
        this.initDevices()
    }

    private async initDevices(): Promise<void> {
        const hideOutletDevices = await this.storageService.getItem('hideOutletDevices')

        this.smartthingsService.getDevices().then((response: DevicesResponse) => {
            let devices = response.items

            if (hideOutletDevices) {
                devices = devices.filter((device) => !device.label.toLowerCase().includes('outlet'))
            }
            this.devicesSubject.next(devices)
            this.initStatusDevices()
        })
    }

    private async initStatusDevices(): Promise<void> {
        const devices = this.devicesSubject.value
        const statusPromises = devices.map((device) =>
            this.smartthingsService.getStatus(device.deviceId)
        )

        Promise.all(statusPromises).then((statuses) => {
            const updatedDevices = devices.map((device, index) => ({
                ...device,
                status: statuses[index],
            }))
            this.devicesSubject.next(updatedDevices)
            this.initCurrentTVContent()
        })
    }

    private async initCurrentTVContent(): Promise<void> {
        const devices = this.devicesSubject.getValue()
        for (let i = 0; i < devices.length; i++) {
            const device = devices[i]
            if (
                device.deviceTypeName?.includes(DEVICES.SAMSUNG) ||
                device.deviceTypeName?.includes(DEVICES.TV)
            ) {
                try {
                    const description = await this.smartthingsService.getDescription(
                        device.deviceId
                    )
                    devices[i].currentTVContent = this.getCurrentTVContent(
                        description.components.main.tvChannel.tvChannelName.value
                    )
                } catch (error) {
                    console.error('Error obteniendo la descripción del dispositivo:', error)
                }
            }
        }
        this.devicesSubject.next(devices)
    }

    // Arreglar esta función, no funciona correctamente
    private getCurrentTVContent(tvChannelName: string): string {
        const parts = tvChannelName.split('.')
        const lastValue = parts[parts.length - 1]
        return DEVICES.SEEING + lastValue
    }

    getAllDevices(): Observable<Device[]> {
        return this.devices$
    }

    getDeviceById(deviceId: string): Device | undefined {
        return this.devicesSubject.getValue().find((device) => device.deviceId === deviceId)
    }

    getDeviceStatus(deviceId: string): string | void {
        const devices = this.devicesSubject.getValue()
        const deviceIndex = devices.findIndex((device) => device.deviceId === deviceId)
        if (deviceIndex !== -1) {
            return devices[deviceIndex].status
        }
    }

    filterDevicesWithoutOutlet(): void {
        const devices = this.devicesSubject.getValue()
        const filteredDevices = devices.filter(
            (device) => !device.label.toLowerCase().includes('outlet')
        )
        this.devicesSubject.next(filteredDevices)
    }

    updateDeviceStatus(deviceId: string, newStatus: string): void {
        const devices = this.devicesSubject.getValue()
        const deviceIndex = devices.findIndex((device) => device.deviceId === deviceId)
        if (deviceIndex !== -1) {
            devices[deviceIndex].status = newStatus
            this.devicesSubject.next(devices)
        }
    }

    refreshDevices(): Observable<Device[]> {
        this.initDevices()
        return this.devices$
    }
}
