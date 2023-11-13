import config from "../../dbconfig.js";
import sql from 'mssql';


export default class PreguntasService 
    {
        getAll = async (name)=> {
            let returnEntity = null;
            console.log('Estoy en elGetAll');
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                .query('SELECT * FROM Preguntas');
                returnEntity = result.recordsets[0];
            } catch (error) {
                console.log(error)
            }
            return returnEntity;
        }

        insert = async (pregunta) => {
            let rowsAffected = null;
            console.log('Estoy en: Pregunta.insert');
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                .input('pPregunta' , sql.Text, pregunta.Pregunta)
                .input('pRespuesta1' , sql.Text, pregunta.Respuesta1)
                .input('pRespuesta2' , sql.Text, pregunta.Respuesta2)
                .input('pRespuesta3' , sql.Text, pregunta.Respuesta3)
                .input('pRespuesta4' , sql.Text, pregunta.Respuesta4)
                .input('pRespuestaCorrecta' , sql.Int, pregunta.RespuestaCorrecta)
                .input('pFechaCreacion', sql.DateTime, FechaCreacion)

                .query('insert into Preguntas(Pregunta, Respuesta1, Respuesta2, Respuesta3, Respuesta4, RespuestaCorrecta, FechaCreacion) VALUES ( @pPregunta, @pRespuesta1, @pRespuesta2, @pRespuesta3, @pRespuesta4, @pRespuestaCorrecta, @pFechaCreacion)');
            rowsAffected = result.rowsAffected;     
            } catch (error) {
            }
            return rowsAffected;
        }

        update = async (remedio, id) => {
            let rowsAffected = null;
            console.log('Estoy en: MedicamentosService.update(remedio)');
            console.log(remedio);
            console.log(id);
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                .input('pIdMedicamentos' , sql.Int, remedio.IdMedicamentos) 
                .input('pNombreMedicamentos' , sql.Text, remedio.NombreMedicamento)
                    .query('insert into Medicamentos(IdMedicamentos, NombreMedicamento) VALUES (@pIdMedicamentos, @pNombreMedicamento)');
                    
            rowsAffected = result.rowsAffected;    
            } catch (error) {
                console.log(error);
            }
            return rowsAffected;
        }


        deleteById = async (id) => {
            let rowsAffected = 0;
            console.log('Estoy en: MedicamentosService.deleteById(id)');
            console.log("jddj"+id);
            try {
                    let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pIdMedicamentos', sql.Int, id)
                                    .query('DELETE FROM Medicamentos WHERE IdMedicamentos = @pIdMedicamentos');
            rowsAffected = result.rowsAffected; 
            } catch (error) {
                console.log(error);
            }
            return rowsAffected;
        }
}