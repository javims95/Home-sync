const axios = require('axios')

const GOVEE_API_BASE_URL = 'https://openapi.api.govee.com'

const getAllDevices = async (apiKey) => {
    const config = {
        headers: {
            'Govee-API-Key': apiKey,
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios.get(`${GOVEE_API_BASE_URL}/router/api/v1/user/devices`, config)
        return response.data
    } catch (error) {
        throw new Error(`Error al obtener los dispositivos de Govee: ${error}`)
    }
}

const getDeviceState = async (requestId, sku, deviceMAC) => {
    try {
        const response = await axios.post(
            `${GOVEE_API_BASE_URL}/router/api/v1/device/state`,
            {
                requestId: requestId,
                payload: {
                    sku: sku,
                    device: deviceMAC,
                },
            },
            {
                headers: {
                    'Govee-API-Key': process.env.GOVEE_API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        )

        return response.data
    } catch (error) {
        throw new Error(`Error al obtener el estado del termómetro en Govee: ${error}`)
    }
}

module.exports = {
    getAllDevices,
    getDeviceState,
}
