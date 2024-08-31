import {Router, Request as req, Response as res} from 'express';
import { listAllMeasures } from '../usecase/usecase';
const routes = Router();

routes.get('/:costumer_code/list', async (req, res)=>{
    try {
        const costumerCode = req.params.costumer_code;
        if(!costumerCode){
            return res.status(400).json({error_code: '', error_description: ''});
        }
        const response = await listAllMeasures(costumerCode);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error_code: '500', error_description: 'Erro interno do servidor.' });
    }
});

export default routes;