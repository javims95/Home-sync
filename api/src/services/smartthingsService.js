const axios = require('axios')
const cron = require('node-cron')
const { exec } = require('child_process')

const SMARTTHINGS_API_BASE_URL = 'https://api.smartthings.com/v1'

const getSmartThingsDevices = async () => {
    try {
        const response = await axios.get(`${SMARTTHINGS_API_BASE_URL}/devices`, {
            headers: {
                Authorization: `Bearer ${process.env.SMART_THINGS_API_KEY}`,
            },
        })

        return response.data
    } catch (error) {
        throw new Error(`Error al obtener los dispositivos de SmartThings: ${error}`)
    }
}

const getDeviceDescription = async (deviceId) => {
    try {
        const response = await axios.get(`${SMARTTHINGS_API_BASE_URL}/devices/${deviceId}`, {
            headers: {
                Authorization: `Bearer ${process.env.SMART_THINGS_API_KEY}`,
                'Content-Type': 'application/json',
            },
        })

        return response.data
    } catch (error) {
        throw new Error(`Error al obtener el estado del dispositivo en SmartThings: ${error}`)
    }
}

const getDeviceStatus = async (deviceId) => {
    try {
        const response = await axios.get(`${SMARTTHINGS_API_BASE_URL}/devices/${deviceId}/status`, {
            headers: {
                Authorization: `Bearer ${process.env.SMART_THINGS_API_KEY}`,
                'Content-Type': 'application/json',
            },
        })

        return response.data
    } catch (error) {
        throw new Error(`Error al obtener el estado del dispositivo en SmartThings: ${error}`)
    }
}

const turnOnDevice = async (deviceId) => {
    try {
        const response = await axios.post(
            `${SMARTTHINGS_API_BASE_URL}/devices/${deviceId}/commands`,
            {
                commands: [
                    {
                        component: 'main',
                        capability: 'switch',
                        command: 'on',
                        arguments: [],
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SMART_THINGS_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        return response.data
    } catch (error) {
        throw new Error(`Error al encender el dispositivo en SmartThings: ${error}`)
    }
}

const turnOffDevice = async (deviceId) => {
    try {
        const response = await axios.post(
            `${SMARTTHINGS_API_BASE_URL}/devices/${deviceId}/commands`,
            {
                commands: [
                    {
                        component: 'main',
                        capability: 'switch',
                        command: 'off',
                        arguments: [],
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SMART_THINGS_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        return response.data
    } catch (error) {
        throw new Error(`Error al apagar el dispositivo en SmartThings: ${error}`)
    }
}

const scheduleDeviceOn = async (deviceId, delaySeconds) => {
    // Define la tarea cron para encender el dispositivo
    const task = cron.schedule(
        `*/${delaySeconds} * * * * *`,
        async () => {
            try {
                const response = await turnOnDevice(deviceId)
                console.log(`Dispositivo ${deviceId} encendido:`, response)

                // Detiene la tarea cron después de ejecutarse
                task.stop()
            } catch (error) {
                console.error(`Error al encender el dispositivo ${deviceId}:`, error)
            }
        },
        {
            scheduled: true,
            timezone: 'Europe/Madrid', // Zona horaria ajustada a Madrid
        }
    )

    // Retorna el ID de la tarea cron
    return task.id
}

const scheduleDeviceOff = async (deviceId, delaySeconds) => {
    try {
        const runAt = new Date(Date.now() + delaySeconds * 1000).toISOString()
        const response = await axios.post(
            `${SMARTTHINGS_API_BASE_URL}/devices/${deviceId}/schedules`,
            {
                commands: [
                    {
                        component: 'main',
                        capability: 'switch',
                        command: 'off',
                        arguments: [],
                    },
                ],
                runAt,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SMART_THINGS_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        return response.data
    } catch (error) {
        throw new Error(`Error al programar el apagado del dispositivo en SmartThings: ${error}`)
    }
}

module.exports = {
    getSmartThingsDevices,
    getDeviceDescription,
    getDeviceStatus,
    turnOnDevice,
    turnOffDevice,
    scheduleDeviceOn,
    scheduleDeviceOff,
}
