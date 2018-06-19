import { Customer } from "./customer";
import { Item } from "./item";

export class Sale {
    id: string;
    code: number;
    customerId: string;
    customer: Customer;
    readonly creationDate: Date;
    details: SaleDetail[];

    constructor(code: number, creationDate?: Date) {
        this.code = code;
        this.creationDate = creationDate || new Date();
    }
}

export class SaleDetail {
    id: string;
    itemId: string;
    item: Item;
    quantity: number;
    price: number;
    amount: number;

    constructor(
        id: string,
        item: Item,
        quantity: number,
        price: number,
    ) {
        this.id = id;
        this.itemId = item.id;
        this.item = item;
        this.quantity = quantity;
        this.price = price;
        this.amount = quantity * price;
    }
}
