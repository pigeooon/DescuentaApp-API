import "dotenv/config";
import jwt from "jsonwebtoken";
import { IAccount } from "../interfaces/account.interface";
import { accountService } from "../services/account.service";

export const adminMiddleware = async (req: any, res: any, next: any) => {
    const accountData: IAccount = await accountService.getAccountByEmail(req.account) as IAccount;

    if(!accountData || !accountData.email || !accountData.password || !accountData.administrator) return res.status(401).json({msg:"UNAUTHORIZED"});
    next();
}