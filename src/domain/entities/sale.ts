import { Customer } from "./customer";
import { Item } from "./item";

export class Sale {
    id: string;
    code: number;
    customerId: string;
    readonly creationDate: Date;
    details: SaleDetail[];
    numberOfMonths: number;
    total: number;

    constructor(
        id: string, code: number, customerId: string,
        details: SaleDetail[],
        numberOfMonths: number, total: number,
        creationDate?: Date,
    ) {

        if (!id) throw new Error('id empty');
        if (!code) throw new Error('code empty');
        if (!customerId) throw new Error('customerId empty');
        if (!details || details.length === 0) throw new Error('details empty');
        if (!numberOfMonths) throw new Error('numberOfMonths empty');
        if (!total) throw new Error('total empty');


        this.id = id;
        this.code = code;
        this.customerId = customerId;
        this.creationDate = creationDate || new Date();
        this.details = details;
        this.numberOfMonths = numberOfMonths;
        this.total = total;
    }
}

export class SaleDetail {
    itemId: string;
    quantity: number;

    constructor(
        quantity: number,
        itemId: string
    ) {
        if (!quantity) throw new Error('quantity empty');

        this.itemId = itemId;
        this.quantity = quantity;
    }
}
