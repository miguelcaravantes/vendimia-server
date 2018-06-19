import { Sale } from "../../domain/entities/sale";
import { injectable } from "inversify";
import { SaleModel } from "../models/sale.model";
import { SaleRepository } from "../../domain/contracts/repositories/sale-repository";

@injectable()
export class MongoSaleRepository implements SaleRepository {

    getList(): Promise<Sale[]> {
        return SaleModel.find().populate('customer').exec();
    }

    get(id: string): Promise<Sale> {
        return SaleModel.findById(id).exec();
    }

    create(sale: Sale): Promise<void> {

        const entity = {
            ...sale,
            ...{ customer: sale.customerId },
            ...{
                details: sale.details.map(d => ({ ...d, ...{ item: d.itemId } })
                )
            }
        }
        return SaleModel.create(entity).then(() => null);
    }

    update(sale: Sale): Promise<void> {
        return SaleModel.findByIdAndUpdate(sale.id, sale).then(() => null);
    }

    delete(id: string): Promise<void> {
        return SaleModel.findByIdAndRemove(id).then(() => null);
    }

    nextCode(): Promise<number> {
        return SaleModel.find().sort('-code').limit(1).then(c =>
            (c[0] ? c[0].code : 0) + 1
        );
    }
}
