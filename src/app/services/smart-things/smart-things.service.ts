import { Injectable } from '@angular/core'
import { ConfigSchedule } from 'src/app/models/schedule-simple'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class SmartThingsService {
    constructor() {}

    getDevices = async () => {
        const response = await fetch(`${environment.SMART_THINGS_API_BASE_URL}/devices`)
        if (!response.ok) {
            throw new Error('No se pudo obtener los dispositivos')
        }
        return await response.json()
    }

    getDescription = async (deviceId: string) => {
        const response = await fetch(`${environment.SMART_THINGS_API_BASE_URL}/devices/${deviceId}`)
        if (!response.ok) {
            throw new Error('No se pudo obtener la descripción del dispositivo')
        }
        return await response.json()
    }

    getStatus = async (deviceId: string) => {
        const response = await fetch(
            `${environment.SMART_THINGS_API_BASE_URL}/devices/${deviceId}/status`
        )
        if (!response.ok) {
            throw new Error('No se pudo obtener el estado del dispositivo')
        }
        return await response.json()
    }

    toggleDevice = async (deviceId: string) => {
        const response = await fetch(
            `${environment.SMART_THINGS_API_BASE_URL}/devices/${deviceId}/toggle`
        )
        if (!response.ok) {
            throw new Error('No se pudo cambiar el estado del dispositivo')
        }
        return await response.json()
    }

    turnOnDevice = async (deviceId: string) => {
        const response = await fetch(
            `${environment.SMART_THINGS_API_BASE_URL}/devices/${deviceId}/turn-on`,
            { method: 'POST' }
        )
        if (!response.ok) {
            throw new Error('No se pudo encender el dispositivo')
        }
        return await response.json()
    }

    turnOffDevice = async (deviceId: string) => {
        const response = await fetch(
            `${environment.SMART_THINGS_API_BASE_URL}/devices/${deviceId}/turn-off`,
            { method: 'POST' }
        )
        if (!response.ok) {
            throw new Error('No se pudo apagar el dispositivo')
        }
        return await response.json()
    }

    scheduleSimpleDevice = async (configSchedule: ConfigSchedule) => {
        const response = await fetch(
            `${environment.SMART_THINGS_API_BASE_URL}/devices/${configSchedule.deviceId}/simple-schedule`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(configSchedule),
            }
        )
        if (!response.ok) {
            throw new Error('No se pudo programar el dispositivo')
        }
        return await response.json()
    }

    cancelScheduledTask = async (taskId: string) => {
        const response = await fetch(`${environment.SMART_THINGS_API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('No se pudo cancelar la tarea programada')
        }

        return await response.json()
    }
}
