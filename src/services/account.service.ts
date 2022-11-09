import { Account } from "../models/account.model";
import { AccountDocument, IAccount } from "../interfaces/account.interface";

class AccountService {

    constructor() {
    }

    async getAccountByEmail(accountEmail: string) {
        try {
            const account = await Account.findOne({email: accountEmail}).lean();
            return account;
        }
        catch (err) {
            throw err;
        }
    }

    async checkAccountAvailability(accountEmail: string) {
        try {
            const account = await Account.findOne({email: accountEmail}).lean();
            if(!account || !account.email || !account.password) return false;
            return true;
        }
        catch (err) {
            throw err;
        }
    }

    async createAccount(email: string, password: string) {
        try {
            const createdAccount = await new Account({email: email, password: password}).save();
            return createdAccount;
        }
        catch (err) {
            throw err;
        }   
    }
}

export const accountService = new AccountService();