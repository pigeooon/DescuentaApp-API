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
            if(!account || !account.email || !account.password) return true;
            return false;
        }
        catch (err) {
            throw err;
        }
    }

    async createAccount(name: string, email: string, password: string) {
        try {
            const createdAccount = await new Account({name: name, email: email, password: password, administrator: false}).save();
            return createdAccount;
        }
        catch (err) {
            throw err;
        }   
    }

    async updateAccount(userEmail: string, preferences: any) {
        try {
            const updateUserResponse = await Account.updateOne({email: userEmail}, {preferences: preferences});
            return updateUserResponse;
        }
        catch (err) {
            throw err;
        }   
    }
}

export const accountService = new AccountService();