import {Router, Request as req, Response as res} from 'express';
const testRoutes = Router();

testRoutes.get('/', (req, res)=>{
    res.send('Servidor funcional');
})

export default testRoutes;