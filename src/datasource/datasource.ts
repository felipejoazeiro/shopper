import { MeasureConfirmEntity } from '../models/measure_confirm_entity';
import { ErrorRes } from '../models/res_entity';
import {db} from './connection';


interface Measure{
    measure_uuid: string;
    measure_datetime: string; 
    measure_type: string;
    has_confirmed: boolean;
    image_url: string;
}

export interface ListMeasuresResponse{
    costumer_code: string;
    measures: Measure[];
}


export const checkIfMesuareExists = async (measure_uuid: string): Promise<boolean | ErrorRes> =>{
    try {
        const result = await db.oneOrNone('SELECT * FROM measure WHERE measure_uuid = $1', [measure_uuid]);
        if(result){
            return true;
        }
        return false;
    } catch (error) {
        return {error_code: 'INVALID_DATA', error_description: (error as Error).message };
    }
}

export const checkIfLLMIsConfirmed = async (measure_uuid: string): Promise<boolean | ErrorRes> => {
    try {
        const result = await db.oneOrNone('SELECT has_confirmed FROM measure WHERE measure_uuid = $1', [measure_uuid]);
        if(result){
            return result.has_confirmed;
        }
        throw new Error('Measure not found!');
    } catch (error) {
        throw new Error('Database Error');
    }
}

export const updateMeasureValue = async (measure_uuid: string, confirmed_value: number) : Promise<boolean | ErrorRes> => {
    try {
        await db.none('UPDATE measure SET measure_value = $1, has_confirmed = true WHERE measure_uuid = $2', [confirmed_value, measure_uuid]);
        await db.none('')
        return true;
    } catch (error) {
        return {error_code: '', error_description: (error as Error).message}
    }
}

export const checkIfMeasureAlreadyTaken = async (measure_datetime: string, costumer_code: string, measure_type: string):Promise<boolean | ErrorRes> => {
    try {
        const result = await db.oneOrNone('SELECT * FROM measure WHERE fk_user = $1 AND measure_type = $2 AND measure_datetime = $3', [costumer_code, measure_type, measure_datetime]);

        if(result){
            return true;
        }
        return false;
    } catch (error) {
        return {error_code: '', error_description: (error as Error).message}
    }
}

export const postMeasure = async (measure_uuid: string, measure_datetime: string, measure_type: string, measure_value: number, image_url: string, costumer_code: string): Promise<MeasureConfirmEntity | ErrorRes> => {
    try {
        await db.none('INSERT INTO measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, fk_user) VALUES ($1,$2,$3,$4,false,$6,$7);',[measure_uuid,measure_datetime,measure_type,measure_value,image_url,costumer_code]) 

        return {image_url, measure_value, measure_uuid};
    } catch (e) {
        return {error_code: '', error_description: (e as Error).message}

    }
}

export const listAllMeasuresDatasource = async (costumer_code: string): Promise< ListMeasuresResponse | ErrorRes>=>{
    try {   
        const result = await db.any('SELECT measure_uuid, measure_datetime, measure_type, has_confirmed, image_url FROM measure WHERE fk_user = $1;',[costumer_code]);
        const response: ListMeasuresResponse = {
            costumer_code: costumer_code,
            measures: result.map(row => ({
                measure_uuid: row.measure_uuid,
                measure_datetime: row.measure_datetime.toISOString(),
                measure_type: row.measure_type,
                has_confirmed: row.has_confirmed,
                image_url: row.image_url
            }))
        }

        return response;
    } catch (e) {
        return {error_code: '', error_description: (e as Error).message}
    }
}