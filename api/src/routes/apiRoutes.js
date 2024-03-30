const express = require('express')
const smartthingsRoutes = require('./smartthingsRoutes')
const goveeRoutes = require('./goveeRoutes')

const router = express.Router()

router.use('/smartthings', smartthingsRoutes)
router.use('/govee', goveeRoutes)

module.exports = router
