import { v4 as uuid } from 'uuid';

export class Customer {
    id: string;
    code: number;
    firstName: string;
    lastName: string;
    mothersLastName: string;
    rfc: string;

    constructor(code: number) {
        this.code = code;
    }
}
