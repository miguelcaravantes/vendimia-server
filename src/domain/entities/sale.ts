import { Customer } from "./customer";
import { Item } from "./item";

export class Sale {
    id: string;
    // TODO code in view
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
        this.itemId = itemId;
        this.quantity = quantity;
    }
}
