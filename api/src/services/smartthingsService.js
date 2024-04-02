const axios = require('axios')

const SMARTTHINGS_API_BASE_URL = 'https://api.smartthings.com/v1'

const getSmartThingsDevices = async () => {
    try {
        const response = await axios.get(`${SMARTTHINGS_API_BASE_URL}/devices`, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
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
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
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
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
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
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
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
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        return response.data
    } catch (error) {
        throw new Error(`Error al apagar el dispositivo en SmartThings: ${error}`)
    }
}

module.exports = {
    getSmartThingsDevices,
    getDeviceDescription,
    getDeviceStatus,
    turnOnDevice,
    turnOffDevice,
}
