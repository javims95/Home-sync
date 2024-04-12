const axios = require('axios')
const conexion = require('../database/conexion')
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

// TASKS
const scheduleSimpleTask = async (deviceId, action, delay) => {
    const taskId = `task-${deviceId}-${Date.now()}`

    const taskData = {
        task_id: taskId,
        device_id: deviceId,
        type_schedule: 'simple',
        action: action,
        delay: delay,
        scheduled_at: new Date().toISOString(),
        status: 'scheduled',
    }

    const sql = 'INSERT INTO tasks SET ?'

    return new Promise((resolve, reject) => {
        conexion.query(sql, taskData, (error, results) => {
            if (error) {
                reject(error)
                return
            }

            resolve(taskId)
        })
    })
}

const cancelSimpleTask = async (taskId) => {
    try {
        // Consultar la tarea por taskId
        const sql = 'SELECT * FROM tasks WHERE task_id = ?'
        conexion.query(sql, [taskId], (error, rows) => {
            if (error) {
                throw error
            }
            console.log(rows)

            if (rows.length === 0) {
                throw new Error('Tarea no encontrada')
            }

            // Eliminar la tarea de la base de datos
            const deleteSql = 'DELETE FROM tasks WHERE task_id = ?'
            conexion.query(deleteSql, [taskId], (deleteError) => {
                if (deleteError) {
                    throw deleteError
                }

                return {
                    message: `Tarea cancelada exitosamente.`,
                    taskId: taskId,
                }
            })
        })
    } catch (error) {
        throw new Error(`Error al cancelar la tarea: ${error.message}`)
    }
}

module.exports = {
    getSmartThingsDevices,
    getDeviceDescription,
    getDeviceStatus,
    turnOnDevice,
    turnOffDevice,
    scheduleSimpleTask,
    cancelSimpleTask,
}
