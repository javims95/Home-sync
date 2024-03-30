const express = require('express')
const router = express.Router()

router.get('/devices', (req, res) => {
    // Implementación de la lógica para Govee
})

router.post('/command', (req, res) => {
    // Implementación de la lógica para enviar comandos a Govee
})

module.exports = router
