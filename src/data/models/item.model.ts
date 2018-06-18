import * as mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    _id: String,
    code: Number,
    description: String,
    model: String,
    price: Number,
    stock: Number,
});

ItemSchema.virtual('id').
    get(function() { return this._id; }).
    set(function(id: string) {
        this._id = id;
    });


const ItemModel = mongoose.model<any>('Item', ItemSchema);
export { ItemModel };
