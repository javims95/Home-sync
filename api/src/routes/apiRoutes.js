const express = require('express')
const smartthingsRoutes = require('./smartThingsRoutes')

const router = express.Router()

router.use('/smartthings', smartthingsRoutes)

module.exports = router
