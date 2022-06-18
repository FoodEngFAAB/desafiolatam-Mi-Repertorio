const { Pool } = require("pg")
const http = require('http')
const url = require('url')
const fs = require('fs')

const { insertDB, queryDB, editDB, deleteDB } = require('./queries')

//Puerto
const port = 3000

//Levantando un servidor con conexión a PostgreSQL
http
    .createServer(async (req, res) => {
        //Disponibiliza petición POST.

        if (req.url == '/cancion' && req.method === 'POST') {
            res.setHeader('Content-Type', 'application/json')

            //Recibe los datos correspondientes a una canción
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
                //Muestra resultado por consola
                console.log(`Datos de la canción agregada: `, body)
            })

            //Realiza la inserción en la tabla repertorio
            req.on('end', async () => {
                const dataDB = Object.values(JSON.parse(body))
                const result = await insertDB(dataDB)
                res.end(JSON.stringify(result))
            })
        }

        //Disponibiliza petición GET
        if (req.url == '/' && req.method === 'GET') {
            res.setHeader('Content-Type', 'text/html')
            const lectura = fs.readFileSync('./index.html')
            res.end(lectura)
        }

        //Muestra tabla de canciones
        if (req.url == '/canciones' && req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json')
            const result = await queryDB()

            //Devuelve un JSON con los registros de la tabla repertorio .
            res.end(JSON.stringify(result))
        }

        //Disponibiliza petición PUT
        if (req.url.startsWith("/cancion?") && req.method === 'PUT') {
            //Recibe los datos de una canción que se desea editar y ejecuta una función asíncrona para hacer la consulta SQL
            const { id } = url.parse(req.url, true).query
            console.log(`ID al disponibilizar PUT\n:`, id)
            res.setHeader('Content-Type', 'application/json')
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
                console.log('Datos obtenidos para editar: ', body)
            })

            //Actualiza registro de la tabla repertorio
            req.on('end', async () => {
                const dataDB = Object.values(JSON.parse(body))
                const result = await editDB(id, dataDB)
                console.log(`Actualización de la tabla repertorio\n:`, result)
                res.end(JSON.stringify(result))
            })
        }

        //Disponibiliza petición DELETE
        if (req.url.startsWith('/cancion?') && req.method == 'DELETE') {
            //Recibe por queryString el id de una canción y realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos.
            const { id } = url.parse(req.url, true).query
            console.log(`ID al disponibilizar DELETE\n:`, id)
            const answer = await deleteDB(id)
            res.end(JSON.stringify(answer))
        }


    }).listen(port)
