const {
    getSmartThingsDevices,
    getDeviceStatus,
    turnOnDevice,
    turnOffDevice,
} = require('../services/smartthingsService')

const getDevices = async (req, res) => {
    try {
        const devices = await getSmartThingsDevices()
        res.json(devices)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getStatus = async (req, res) => {
    const { deviceId } = req.params
    try {
        const response = await getDeviceStatus(deviceId)
        res.json(response.components.main.switch.switch.value)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const toggleDevice = async (req, res) => {
    const { deviceId } = req.params

    try {
        const response = await getDeviceStatus(deviceId)

        if (
            response &&
            response.components &&
            response.components.main &&
            response.components.main.switch &&
            response.components.main.switch.switch &&
            response.components.main.switch.switch.value
        ) {
            const currentStatus = response.components.main.switch.switch.value

            if (currentStatus === 'on') {
                await turnOffDevice(deviceId)
                res.json({ message: 'Dispositivo apagado' })
            } else if (currentStatus === 'off') {
                await turnOnDevice(deviceId)
                res.json({ message: 'Dispositivo encendido' })
            } else {
                res.status(500).json({
                    message: 'Estado del dispositivo desconocido',
                })
            }
        } else {
            res.status(500).json({
                message: 'Respuesta de SmartThings inesperada',
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const turnOn = async (req, res) => {
    const { deviceId } = req.params

    try {
        const response = await turnOnDevice(deviceId)
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const turnOff = async (req, res) => {
    const { deviceId } = req.params

    try {
        const response = await turnOffDevice(deviceId)
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getDevices,
    toggleDevice,
    turnOn,
    turnOff,
    getStatus,
}
