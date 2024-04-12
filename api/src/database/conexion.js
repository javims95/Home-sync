const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'home_sync',
    user: 'root',
    password: '',
})

conexion.connect(function (err) {
    if (err) {
        throw err
    } else {
        console.log('Conexión exitosa')
    }
})

module.exports = conexion
