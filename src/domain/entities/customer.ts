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
