import * as mongoose from "mongoose";

const ConfigurationSchema = new mongoose.Schema({
    financeRate: Number,
    downPayment: Number,
    deadline: Number,
});
const ConfigurationModel = mongoose.model<any>('Configuration', ConfigurationSchema);
export { ConfigurationModel };
