import * as mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    id: String,
    code: Number,
    firstName: String,
    lastName: String,
    mothersLastName: String,
    rfc: String,

});
const CustomerModel = mongoose.model<any>('Customer', CustomerSchema);
export { CustomerModel };
