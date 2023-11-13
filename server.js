import express from "express";
import cors from "cors";
import PreguntasRouter from "././src/controllers/controller.js"

const app  = express(); 
const port = 3000; 
app.use(cors());
app.use(express.json());

app.use("/api/preguntas/",PreguntasRouter);


app.use(express.static('public'));

app.listen(port,()=>{
    console.log('listening on port');
})