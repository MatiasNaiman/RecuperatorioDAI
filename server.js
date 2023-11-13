import express from "express";
import cors from "cors";
import MedicamentosRouter from "./ControllerMedicamento.js";


const app  = express(); 
const port = 3000; 
app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/api/medicamento/",MedicamentosRouter);


app.use(express.static('public'));

app.listen(port,()=>{
    console.log('listening on port');
})