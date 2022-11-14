import { StatusCodes } from "http-status-codes";

import "dotenv/config";
import jwt from "jsonwebtoken";
import { IAccount } from "../interfaces/account.interface";
import { accountService } from "../services/account.service";

export const adminMiddleware = async (req: any, res: any, next: any) => {
    const accountData = await accountService.getAccountByEmail(req.account);
    if(!accountData || !accountData.email || !accountData.password || !accountData.administrator) 
        return res.status(StatusCodes.NOT_FOUND);

    next();
}