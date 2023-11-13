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
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pPregunta', sql.Text, pregunta)
                .input('pRespuesta1', sql.Text, Respuesta01)
                .input('pRespuesta2', sql.Text, Respuesta02)
                .input('pRespuesta3', sql.Text, Respuesta03)
                .input('pRespuesta4', sql.Text, Respuesta04)
                .input('pRespuestaCorrecta', sql.Int, RespuestaCorrecta)
                .input('pFechaCreacion', sql.DateTime, FechaCreacion)

                .query('insert into Preguntas(Pregunta, Respuesta1, Respuesta2, Respuesta3, Respuesta4, RespuestaCorrecta, FechaCreacion) VALUES ( @pPregunta, @pRespuesta1, @pRespuesta2, @pRespuesta3, @pRespuesta4, @pRespuestaCorrecta, @pFechaCreacion)');
            rowsAffected = result.rowsAffected;
        } catch (error) {
        }
        return rowsAffected;
    }
}
