import 'dotenv/config'
import PeliculasService from './src/services/peliculas-services.js';
import express from "express";

const app  = express(); 
const port = 3000; 
app.use(express.json());

let svc = new PeliculasService();

app.get("/api/peliculas/:id", async (req, res) => {
    try {
        let id = req.params.id
        let respuesta = req.query.respuesta
        console.log("el id es: ",id)
        let get = await svc.getById(id);
        console.log("get")
        console.log(get)
        if (get != null && get != undefined) {
            res.status(200).send(get.RespuestaCorrecta == respuesta);
        } else {
            res.status(404).send("No se encontro la pelicula");
        }
    } catch (error) {
        res.send("error");
    }
});

app.get("/api/peliculas", async (req, res) => {
    try {
        let duracion = req.query.min
        console.log("la duracion es: ",duracion)
        let get = await svc.getByDuracion(duracion);
        console.log('la duracion minima es: ',req.query)
        console.log("getByDuracion")
        console.log(get)
        if (get != null && get != undefined) {
            res.status(200).send(get);
        } else {
            res.status(404).send("No se encontro la pelicula");
        }
    } catch (error) {
        res.send("error");
    }
});

app.post("/api/peliculas/", async (req, res) => {
    try {
        let data = req.body
        console.log("body" + JSON.stringify(req.body))
        const FechaCreacion = new Date()
        let insert = await svc.insert(data.Pregunta, data.Respuesta01, data.Respuesta02, data.Respuesta03, data.Respuesta04, data.RespuestaCorrecta, FechaCreacion);
        res.send(insert);
    } catch (error) {
        res.send("error");
    }
});

app.put('/api/peliculas/:id', async (req,res) =>{
    let body = req.body;
    let id = req.params.id
    let get = await svc.getById(id);
    const pelicula = await svc.update(id,body);

    if (get != null && get != undefined) {
        return  res.status(200).send('Todo OK (200)!');
    } else {
        res.status(404).send("No se encontro la pelicula");
    }
    
})

app.listen(port,()=>{
    console.log('listening on port '+port);
})
