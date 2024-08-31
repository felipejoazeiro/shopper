import express, {Router, Request as req, Response as res} from 'express';
import { confirmOrChangeLLM } from '../usecase/usecase'
const confirmRoutes = Router();

confirmRoutes.patch('/',async (req,res) => { 
    try {
        const result = await confirmOrChangeLLM(req.body);
        if('error_code' in result){
            let statusCode : number;
            switch(result.error_code){
                case 'INVALID_DATA':
                    statusCode = 400;
                    break;
                case 'MEASURE_NOT_FOUND':
                    statusCode= 404;
                    break;
                case 'CONFIRMATION_DUPLICATE':
                    statusCode= 409;
                    break;
                default:
                    statusCode=500;
                    break;
            }
            res.status(statusCode).json(result);
        }else{
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({error_code: 'UNEXPECTED_ERROR', error_message: (error as Error).message});
    }
});

export default confirmRoutes;