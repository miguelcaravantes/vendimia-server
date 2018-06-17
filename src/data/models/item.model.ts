import * as mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    id: String,
    code: Number,
    description: String,
    model: String,
    price: Number,
    stock: Number,
});
const ItemModel = mongoose.model<any>('Item', ItemSchema);
export { ItemModel };
