const {
    getSmartThingsDevices,
    getDeviceDescription,
    getDeviceStatus,
    turnOnDevice,
    turnOffDevice,
    scheduleDeviceOn,
    scheduleDeviceOff,
} = require('../services/smartthingsService')

// Objeto para almacenar las tareas
const taskRegistry = {}

const getDevices = async (req, res) => {
    try {
        const devices = await getSmartThingsDevices()
        res.json(devices)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getDescription = async (req, res) => {
    const { deviceId } = req.params
    try {
        const response = await getDeviceStatus(deviceId)
        res.json(response)
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

// const simpleSchedule = async (req, res) => {
//     const { deviceId, action, delay } = req.body
//     console.log(deviceId, action, delay);
//     try {
//         const taskId = action === 'turnOn' ? await scheduleDeviceOn(deviceId, delay) : await scheduleDeviceOff(deviceId, delay)
//         res.json({
//             message: `Tarea programada para encender el dispositivo ${deviceId} en ${delay} segundos.`,
//             taskId: taskId,
//         })
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

const simpleSchedule = async (req, res) => {
    const { deviceId, action, delay } = req.body
    const taskId = `task-${deviceId}-${Date.now()}` // Generar un ID único para la tarea

    // Almacenar la referencia del timeout
    taskRegistry[taskId] = setTimeout(async () => {
        try {
            if (action === 'turnOn') {
                await turnOnDevice(deviceId)
            } else if (action === 'turnOff') {
                await turnOffDevice(deviceId)
            }
            delete taskRegistry[taskId] // Limpia la referencia una vez ejecutada la tarea
        } catch (error) {
            console.error(error)
        }
    }, delay)

    res.json({
        message: `Tarea programada para ${action} el dispositivo ${deviceId} en ${delay / 60 / 1000} minutos.`,
        taskId: taskId,
    })
}

const cancelScheduledTask = (req, res) => {
    const { taskId } = req.params

    if (taskRegistry[taskId]) {
        clearTimeout(taskRegistry[taskId])
        delete taskRegistry[taskId] // Eliminar la referencia de la tarea cancelada
        res.json({ message: `Tarea ${taskId} cancelada con éxito.` })
    } else {
        res.status(404).json({ message: `Tarea ${taskId} no encontrada.` })
    }
}

module.exports = {
    getDevices,
    getDescription,
    toggleDevice,
    turnOn,
    turnOff,
    getStatus,
    simpleSchedule,
    cancelScheduledTask,
}
