import "dotenv/config";
import jwt from "jsonwebtoken";
import { IAccount } from "../interfaces/account.interface";
import { accountService } from "../services/account.service";

export const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({msg:"UNAUTHORIZED"});

    const token = authHeader.split(" ")[1];

    jwt.verify(token, String(process.env.JWT_SECRET), async (err:any, data:any) => {
        if(err) return res.status(401).json({msg:"UNAUTHORIZED"});

        const accountData: any = await accountService.getAccountByEmail(data.account);
        
        req.account = accountData.email;
        
        next();
    });
}