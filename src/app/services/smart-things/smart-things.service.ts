import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class SmartThingsService {
    constructor() {}

    async getDevices() {
        const response = await fetch(`${environment.SMART_THINGS_BASE_URL}/devices`)
        if (!response.ok) {
            throw new Error('No se pudo obtener los dispositivos')
        }
        return await response.json()
    }

    async getDescription(deviceId: string) {
        const response = await fetch(`${environment.SMART_THINGS_BASE_URL}/devices/${deviceId}`)
        if (!response.ok) {
            throw new Error('No se pudo obtener la descripción del dispositivo')
        }
        return await response.json()
    }

    async getStatus(deviceId: string) {
        const response = await fetch(
            `${environment.SMART_THINGS_BASE_URL}/devices/${deviceId}/status`
        )
        if (!response.ok) {
            throw new Error('No se pudo obtener el estado del dispositivo')
        }
        return await response.json()
    }

    async toggleDevice(deviceId: string) {
        const response = await fetch(
            `${environment.SMART_THINGS_BASE_URL}/devices/${deviceId}/toggle`
        )
        if (!response.ok) {
            throw new Error('No se pudo cambiar el estado del dispositivo')
        }
        return await response.json()
    }

    async turnOnDevice(deviceId: string) {
        const response = await fetch(
            `${environment.SMART_THINGS_BASE_URL}/devices/${deviceId}/turn-on`,
            { method: 'POST' }
        )
        if (!response.ok) {
            throw new Error('No se pudo encender el dispositivo')
        }
        return await response.json()
    }

    async turnOffDevice(deviceId: string) {
        const response = await fetch(
            `${environment.SMART_THINGS_BASE_URL}/devices/${deviceId}/turn-off`,
            { method: 'POST' }
        )
        if (!response.ok) {
            throw new Error('No se pudo apagar el dispositivo')
        }
        return await response.json()
    }
}
