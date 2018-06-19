import * as mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
    _id: String,
    code: Number,
    customer: { type: String, ref: 'Customer' },
    details: [
        {
            item: { type: String, ref: 'Item' },
            quantity: Number,
        }
    ],
    numberOfMonths: Number,
    total: Number,
    creationDate: Date
});

SaleSchema.virtual('id').
    get(function () { return this._id; }).
    set(function (id: string) {
        this._id = id;
    });

const SaleModel = mongoose.model<any>('Sale', SaleSchema);
export { SaleModel };
