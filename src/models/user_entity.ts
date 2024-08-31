export class UserEntity{
    id: number;
    name: string;
    costumer_code: string;

    constructor(id: number, name: string, costumer_code: string){
        this.id = id;
        this.name = name;
        this.costumer_code = costumer_code;
    }
}