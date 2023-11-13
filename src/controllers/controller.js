import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    let svc = new MedicamentosService();
    let remedio = await svc.getAll();
    res.send(remedio);
    console.log("estoy en el get")
})

router.delete('/:id', Authenticate, async (req, res) => {
    let svc = new MedicamentosService();
    console.log(req.params.id);
    let remedio = await svc.deleteById(req.params.id);

    res.send(remedio);



})

router.put('/:id', Authenticate,  async(req, res) => {
    let cuerpo = req.body;
    console.log(cuerpo);
    console.log('estoy en Update');
    try{
        let svc = new MedicamentosService();
        let remedio  = await svc.update(cuerpo, req.params.id);
        res.send(remedio);
    } catch(error){
        console.log(error);
        res.send("error");

    }
})

router.post('/', Authenticate, async(req, res) => {
    let  cuerpo = req.body;
    console.log(cuerpo);
    console.log('estoy en Insert');

    try{
        let svc = new MedicamentosService();
    let remedio  = await svc.insert(cuerpo);
    res.send(remedio);}
    catch(error)
    {
        res.send("error");

    }
})

export default router;