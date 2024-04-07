const express = require('express')
const router = express.Router()
const {
    getDevices,
    getDescription,
    toggleDevice,
    turnOn,
    turnOff,
    getStatus,
    scheduleOn,
    scheduleOff,
} = require('../../controllers/smartthingsController')

router.get('/devices', getDevices)
router.get('/devices/:deviceId', getDescription)
router.get('/devices/:deviceId/status', getStatus)
router.get('/devices/:deviceId/toggle', toggleDevice)
router.get('/devices/:deviceId/schedule-on/:delaySeconds', scheduleOn)
router.get('/devices/:deviceId/schedule-off/:delaySeconds', scheduleOff)

router.post('/devices/:deviceId/turn-on', turnOn)
router.post('/devices/:deviceId/turn-off', turnOff)

module.exports = router
