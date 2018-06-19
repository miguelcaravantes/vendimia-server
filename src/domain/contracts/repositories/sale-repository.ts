import { Sale } from "../../entities/sale";

export abstract class SaleRepository {
    abstract getList(): Promise<Sale[]>;
    abstract get(id: string): Promise<Sale>;
    abstract create(sale: Sale): Promise<void>;
    abstract update(sale: Sale): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract nextCode(): Promise<number>;
}
