import config from "../../dbconfig.js";
import sql from 'mssql';
import Pelicula from "../models/models.js";


export default class PeliculasService {
    getAll = async () => {
        let allPeliculas = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Peliculas');
            allPeliculas = result.recordsets[0];
        } catch (error) {
            console.error("Error en PeliculasService getAll:", error);
        }
        return allPeliculas;
    }
    
    getById = async (id)=> {
        let returnEntity = null;
        try {
            console.log(config)
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pId' , sql.Int, id)
            .query(`SELECT * FROM Peliculas WHERE id = @pId`)
            returnEntity = result.recordsets[0][0];
            } catch (error) {
            console.log(error)
        }
        return returnEntity;
    }

    getByDuracion = async (DuracionEnMinutos)=> {
        let returnEntity = null;
        try {
            console.log(config)
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pDuracionEnMinutos' , sql.Int, DuracionEnMinutos)
            .query(`SELECT * FROM Peliculas WHERE DuracionEnMinutos >= @pDuracionEnMinutos ORDER BY Nombre`)
            returnEntity = result.recordsets[0];
            } catch (error) {
            console.log(error)
        }
        return returnEntity;
    }

    update = async (id, body) => {
        let rowsAffected = 0;
        console.log('UpdatePelicula')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()            
                .input('id', sql.Int, body.id)    
                .input('nombre', sql.VarChar, body.nombre)
                .query(`UPDATE Peliculas SET Nombre = @nombre WHERE Id = @id`);
            rowsAffected = result.rowsAffected;
        } catch (e){
            //console.log(e);
            CopiaError(e.toString() + " AT PeliculasService/Update");
        }
        return rowsAffected;
    }
}
