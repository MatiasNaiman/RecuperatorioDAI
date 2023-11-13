import 'dotenv/config'
import PreguntasService from "./src/services/preguntas.js";
import express from "express";

const app  = express(); 
const port = 3000; 
app.use(express.json());


let svc = new PreguntasService();

app.get("/api/preguntas/:id", async (req, res) => {
    try {
        let id = req.params.id
        let respuesta = req.query.respuesta
        let get = await svc.getById(id);
        if (get != null && get != undefined) {
            res.status(200).send(get.RespuestaCorrecta == respuesta);
        } else {
            res.status(404).send("La pregunta no existe");
        }
    } catch (error) {
        res.send("error");
    }
});

app.post("/api/preguntas/", async (req, res) => {
    try {
        let data = req.body
        console.log(req.body.Pregunta)
        const FechaCreacion = new Date()
        let insert = await svc.insert(data.Pregunta, data.Respuesta01, data.Respuesta02, data.Respuesta03, data.Respuesta04, data.RespuestaCorrecta, FechaCreacion);
        res.send(insert);
    } catch (error) {
        res.send("error");
    }
});

app.listen(port,()=>{
    console.log('listening on port');
})
