import config from "../../dbconfig.js";
import sql from 'mssql';


export default class PreguntasService {
    getById = async (id)=> {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pId' , sql.Int, id)
            .query(`
                SELECT * 
                FROM Preguntas 
                WHERE  id = @pId
            `)
            returnEntity = result.recordsets[0][0];
            } catch (error) {
            console.log(error)
        }
        return returnEntity;
    }
    insert = async (pregunta, Respuesta01, Respuesta02, Respuesta03, Respuesta04, RespuestaCorrecta, FechaCreacion) => {
        let rowsAffected = null;
        console.log('Estoy en: Pregunta.insert');
        try {
            console.log(pregunta)
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pPregunta', sql.VarChar, pregunta)
                .input('pRespuesta01', sql.VarChar, Respuesta01)
                .input('pRespuesta02', sql.VarChar, Respuesta02)
                .input('pRespuesta03', sql.VarChar, Respuesta03)
                .input('pRespuesta04', sql.VarChar, Respuesta04)
                .input('pRespuestaCorrecta', sql.Int, RespuestaCorrecta)
                .input('pFechaCreacion', sql.DateTime, FechaCreacion)

                .query('INSERT INTO Preguntas(Pregunta, Respuesta01, Respuesta02, Respuesta03, Respuesta04, RespuestaCorrecta, FechaCreacion) VALUES ( @pPregunta, @pRespuesta01, @pRespuesta02, @pRespuesta03, @pRespuesta04, @pRespuestaCorrecta, @pFechaCreacion)');
            rowsAffected = result.rowsAffected;
        } catch (error) {
        }
        return rowsAffected;
    }
}
