import express, {Router, Request as req, Response as res} from 'express';
import { uploadImage } from '../usecase/usecase'
const uploadRoutes = Router();

uploadRoutes.post('/',async (req, res)=>{
    try {
        const result = await uploadImage(req.body);

        console.log(result);

        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({error: e});
    }
})

export default uploadRoutes;