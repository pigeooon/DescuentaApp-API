import { Bank } from "../models/bank.model";
import { BankDocument, IBank } from "../interfaces/bank.interface";

export class BankService {

    constructor() {
    }

    public static async getBanks() {
        const allBanks = await Bank.find().lean();
        return allBanks;
    }

    public static async getBankById(bankId: any) {
        const singleBank = await Bank.findOne({_id: bankId}).lean();
        return singleBank;
    }

    public static async createBank(bankData: any) {
        const newBank = bankData as IBank;

        const newBankResponse = await new Bank(newBank).save();
        return newBankResponse;
    }

    public static async updateBank(bankId:any, bankData: any) {
        const updatedBank = bankData as IBank;

        const updateBankResponse = await Bank.updateOne({_id: bankId}, updatedBank);
        return updateBankResponse;
    }

    public static async deleteBank(bankId: any) {
        const deletedBankResponse = await Bank.findOneAndDelete(bankId);
        return deletedBankResponse;
    }
}