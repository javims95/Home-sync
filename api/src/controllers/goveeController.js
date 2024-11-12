const { getAllDevices, getDeviceState } = require('../services/goveeService')
const { v4: uuidv4 } = require('uuid')

const getDevices = async (req, res) => {
    const apiKey = process.env.GOVEE_API_KEY
    console.log(apiKey);
    

    try {
        const devices = await getAllDevices(apiKey)
        res.json(devices)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getStatus = async (req, res) => {
    const { payload } = req.body
    const { sku, device } = payload
    const apiKey = process.env.GOVEE_API_KEY
    console.log(sku, device, apiKey)

    try {
        const deviceState = await getDeviceState(uuidv4(), sku, device, apiKey)
        res.json(deviceState)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getDevices,
    getStatus,
}
