import { injectable } from "inversify";
import { UpdateConfigurationCommand } from "../use-cases/configuration/update-configuration";
import { Configuration } from "../entities/configuration";

@injectable()
export class SaleCalculator {

    mounts = [3, 6, 9, 12];

    detailPrice = (itemPrice, financeRate, deadline) =>
        this.round(itemPrice * (1 + (financeRate * deadline) / 100));

    amount = (detailPrice, quantity) =>
        this.round(detailPrice * quantity)

    downPayment = (amount, downPaymentConf) =>
        this.round(amount * downPaymentConf / 100)

    downPaymentBonus = (downPayment, financeRate, deadline) =>
        this.round(downPayment * (financeRate * deadline / 100))

    total = (ammount, downPayment, downPaymentBonus) =>
        this.round(ammount - downPayment - downPaymentBonus)

    totalByCountedPrice = (countedPrice, financeRate, months) => {
        return this.round(countedPrice * (1 + (financeRate * months) / 100));
    }

    countedPrice = (total, financeRate, deadline) =>
        this.round(total / (1 + (financeRate * deadline / 100)))



    calculateMonthlyPayments = (total, conf: Configuration) => {
        const countedPrice = this.countedPrice(total, conf.financeRate, conf.deadline);

        return this.mounts
            .map(m => ({ number: m, total: this.totalByCountedPrice(countedPrice, conf.financeRate, m) }))
            .map(m => ({
                numberOfmonths: m.number,
                monthlyPayment: this.round(m.total / m.number),
                total: m.total,
                saving: this.round(total - m.total)
            }));

    }

    private round = (value) =>
        Math.round(value * 100) / 100
}
