const express = require('express')
const router = express.Router()
const {
    getDevices,
    toggleDevice,
    turnOn,
    turnOff,
} = require('../../controllers/smartthingsController')

router.get('/devices', getDevices)
router.get('/devices/:deviceId/toggle', toggleDevice)
router.post('/devices/:deviceId/turn-on', turnOn)
router.post('/devices/:deviceId/turn-off', turnOff)

module.exports = router
