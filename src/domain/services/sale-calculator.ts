import { injectable } from "inversify";
import { UpdateConfigurationCommand } from "../use-cases/configuration/update-configuration";
import { Configuration } from "../entities/configuration";
import { Item } from "../entities/item";
import { Sale } from "../entities/sale";

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

    calculateWithMaxDeadline(sale: any, items: Item[], conf: Configuration) {

        const response: any = {
            details: [...sale.details],
            downPayment: 0,
            downPaymentBonus: 0,
            total: 0,
            monthlyPayments: null
        };

        response.details.forEach(d => {
            const item = items.find(i => i.id === d.itemId);
            d.price = this.detailPrice(item.price, conf.financeRate, conf.deadline);
            d.amount = this.amount(d.price, d.quantity);
        });

        const amount = response.details.map(d => d.amount).reduce((a, b) => a + b, 0);
        response.downPayment = this.downPayment(amount, conf.downPayment);
        response.downPaymentBonus = this.downPaymentBonus(
            response.downPayment,
            conf.financeRate,
            conf.deadline);
        response.total = this.total(amount, response.downPayment, response.downPaymentBonus);
        return response;
    }

    calculateMonthlyPayments = (total, conf: Configuration) => {
        const countedPrice = this.countedPrice(total, conf.financeRate, conf.deadline);

        return this.mounts
            .map(m => ({ number: m, total: this.totalByCountedPrice(countedPrice, conf.financeRate, m) }))
            .map(m => ({
                numberOfMonths: m.number,
                monthlyPayment: this.round(m.total / m.number),
                total: m.total,
                saving: this.round(total - m.total)
            }));

    }

    totalPayment = (total, month: number, conf: Configuration) => {
        const countedPrice = this.countedPrice(total, conf.financeRate, conf.deadline);
        return this.totalByCountedPrice(countedPrice, conf.financeRate, month);
    }

    private round = (value) =>
        Math.round(value * 100) / 100
}
