import {checkIfMesuareExists, checkIfLLMIsConfirmed, updateMeasureValue, checkIfMeasureAlreadyTaken, postMeasure, listAllMeasuresDatasource, ListMeasuresResponse} from '../datasource/datasource';
import { ErrorRes, SuccessRes } from '../models/res_entity';
import {getValue, createLinkForImage} from '../datasource/google_vision_datasource';
import { MeasureConfirmEntity } from '../models/measure_confirm_entity';


interface InputData {
    [key: string]: any;
}


type MeasureType = 'WATER' | 'GAS';

export async function confirmOrChangeLLM(data: InputData): Promise<SuccessRes | ErrorRes> {

    try {
        const measureData = data;

        if(typeof measureData !== 'object' || measureData === null){
            throw new Error('Invalid data Format')
        }

        if(typeof measureData.measure_uuid !== 'string' || typeof measureData.confirmed_value !== 'number'){
            return {error_code: 'INVALID_DATA', error_description: 'Dado inválido'};
        }
        
        if(await checkIfMesuareExists(measureData.measure_uuid) === true){
            const hasConfirmed = await checkIfLLMIsConfirmed(measureData.measure_uuid);
            if(hasConfirmed){
                return {error_code: "CONFIRMATION_DUPLICATE", error_description: 'Leitura do mês já realizada'};
            } 
            let res = await updateMeasureValue(measureData.measure_uuid, measureData.confirmed_value);
            if(res){
                return{success: true};
            }
        }

        return {error_code: 'MEASURE_NOT_FOUND', error_description: 'Leitura do mês já realizada'};
    } catch (error) {
        return {error_code: 'INVALID_DATA', error_description: (error as Error).message};
    }
}

export async function uploadImage(data: InputData): Promise<MeasureConfirmEntity | ErrorRes>{
    try {
        const uploadData = data;

        if(typeof uploadData !== 'object' || typeof uploadData === null){
            return {error_code: 'INVALID_DATA', error_description: 'Dados inválidos'};
        }

            console.log(typeof uploadData.customer_code);

        if(typeof uploadData.customer_code !== 'string' ||  
            typeof uploadData.image !== 'string' || 
            typeof uploadData.measure_datetime !== 'string' || 
            !['WATER', 'GAS'.includes(uploadData.measure_type.toUpperCase() as MeasureType)] ){
                return {error_code: 'INVALID_DATA', error_description: 'Dados inválidos'};
        }

        var check = await checkIfMeasureAlreadyTaken(uploadData.measure_datetime, uploadData.costumer_code, uploadData.measure_type)

        if(check){
            return {error_code: '', error_description: ''}; 
        }
        let resultValue = await getValue(uploadData.image);
        if('error_code' in resultValue){
            return {error_code: '', error_description: ''}; 
        }else{
            const {value} = resultValue;
            let resultLink = await createLinkForImage(uploadData.image);
    
            if('error_code' in resultLink){
                return {error_code: '', error_description: ''}; 
            }else{
                const {url, imageGuid} = resultLink; 
                return await postMeasure(
                    imageGuid, 
                    uploadData.measure_datetime,
                    uploadData.measure_type,
                    value,
                    url,
                    uploadData.costumer_code
                );
            }
        }            
    } catch (error) {
        return {error_code: '', error_description: ''};
    }
} 

export async function listAllMeasures(costumer_code: string): Promise<ListMeasuresResponse | ErrorRes>{
    try {
        return await listAllMeasuresDatasource(costumer_code);
    } catch (error) {
        return {error_code: 'INVALID_DATA', error_description: (error as Error).message};
    }
}
