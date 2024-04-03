const express = require('express')
const router = express.Router()
const { getDevices, getStatus } = require('../../controllers/goveeController')

router.get('/devices', getDevices)
router.post('/devices/status', getStatus)

module.exports = router
