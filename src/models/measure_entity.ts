export class MeasureEntity{
    id: number;
    measure_uuid: string;
    measure_datetime: Date;
    measure_type: string;
    has_confirmed: boolean;
    image_url: string;

    constructor(id: number, measure_uuid: string, measure_datetime: Date, measure_type: string,has_confirmed: boolean, image_url: string ){
        this.id= id;
        this.measure_uuid = measure_uuid;
        this.measure_datetime = measure_datetime;
        this.measure_type =measure_type;
        this.has_confirmed = has_confirmed;
        this.image_url = image_url;
    }
}