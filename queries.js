
//Importar pg
const { Pool } = require("pg")

//Instanciar Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "JBJFourier1768@",
    port: 5432,
    database: "repertorio"
})

//Función asíncrona que recibe el parámetro datos
const insertDB = async (dataDB) => {
    // consulta parametrizada con un JSON como argumento definiendo como values el parámetro datos
    const dataPar = {
        text: "INSERT INTO repertorio (cancion, artista, tono) values ($1, $2, $3) RETURNING *;",
        values: dataDB,
        rowMode: "array"
    }
    try {
        const result = await pool.query(dataPar)
        //Muestra por consola el resultado
        console.log(`Muestra resultado de la inserción de un registro\n`, result.rows[0])
        //Devuelve el objeto result de la query
        return result
    } catch (error) {
        //Devuelve error de la query
        console.log(`Error al agregar registros (insertDB): `, error.code, error.message)
        return error
    }
}

//Función asíncrona para consultar
const queryDB = async () => {
    try {
        const result = await pool.query("SELECT * FROM repertorio")
        console.log(`Muestra resultado de la consulta\n`, result.rows[0])
        //Devuelve el objeto result de la query
        return result.rows
    } catch (error) {
        //Devuelve error de la query
        console.log(`Error en consulta (queryDB): `, error.code, error.message)
        return error
    }
}

//Funcion asíncrona para edición
const editDB = async (id, dataDB) => {
    const dataPar = {
        text: `UPDATE repertorio SET cancion=$1, artista=$2, tono=$3 WHERE id=${id} RETURNING *`,
        values: dataDB,
        rowMode: "array"
    }
    try {
        const result = await pool.query(dataPar)
        //Muestra por consola el resultado
        console.log(`Muestra resultado de la edición de un registro\n`, result.rows[0])
        //Devuelve el objeto result de la query
        return result
    } catch (error) {
        //Devuelve error de la query
        console.log(`Error al editar registro (editDB): `, error.code, error.message)
        return error
    }
}

//Funcion asíncrona para eliminar
const deleteDB = async (id) => {
    try {
        const deleting = await pool.query(`SELECT * FROM repertorio WHERE id= '${id}'`)
        console.log(`Muestra resultado de la eliminación de un registro\n`, deleting.rows)
        const result = await pool.query(`DELETE FROM repertorio WHERE id = '${id}'`)
        //Muestra por consola el resultado
        return result
    } catch (error) {
        //Devuelve error de la query
        console.log(`Error al borrar registro (deleteDB): `, error.code, error.message)
        return error
    }
}

//Exportar módulo
module.exports = { insertDB, queryDB, editDB, deleteDB }
