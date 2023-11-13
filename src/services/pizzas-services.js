import config from "../dbconfig.js";
import sql from 'mssql';


export default class MedicamentosService 
    {
        getAll = async (name)=> {
            let returnEntity = null;
            console.log('Estoy en: MedicamentosService.GetAll');
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                .query('SELECT NombreMedicamento.Medicamentos FROM Medicamentos');
                returnEntity = result.recordsets[0];
            } catch (error) {
                console.log(error)
            }
            return returnEntity;
        }

        insert = async (remedio) => {
            let rowsAffected = null;
            console.log('Estoy en: MedicamentosService.insert(id)');
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                /* .input('pIdMedicamentos' , sql.Int, remedio.IdMedicamentos) */
                .input('pNombreMedicamento' , sql.Text, remedio.NombreMedicamento)
                .input('pIdMedicamentos' , sql.Int, remedio.IdMedicamentos)
                    .query('insert into Medicamentos(IdMedicamentos,NombreMedicamento) VALUES ( @pIdMedicamentos,@pNombreMedicamento)');
            rowsAffected = result.rowsAffected;    
            } catch (error) {
                //console.log(error);
                console.log(IdMedicamentos.value); 
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