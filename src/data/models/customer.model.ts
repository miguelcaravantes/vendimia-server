import * as mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    _id: String,
    code: Number,
    firstName: String,
    lastName: String,
    mothersLastName: String,
    rfc: String,

});

CustomerSchema.virtual('id').
    get(function() { return this._id; }).
    set(function(id: string) {
        this._id = id;
    });

const CustomerModel = mongoose.model<any>('Customer', CustomerSchema);
export { CustomerModel };
