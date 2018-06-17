import { v4 as uuid } from 'uuid';

export class Item {
    id: string;
    code: number;
    description: string;
    model: string;
    price: number;
    stock: number;

    constructor(code: number) {
        this.code = code;
    }
}
