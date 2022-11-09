//import { AccountService } from "../services/account.service";
import "dotenv/config";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { Account } from "../models/account.model";
import { accountService } from "../services/account.service";

class AuthController {

    constructor() {
    }

    validateJwt = async (req: any, res: any) => {
        try {
            const token = req.headers.authorization;
            if(!token) return res.status(401).json({msg: "UNAUTHORIZED"});

            jwt.verify(token, String(process.env.JWT_SECRET));

            return res.status(200);
        }
        catch (error) {
            console.error(error);
            return res.status(500);
        }
    }

    logIn = async (req: any, res: any) => {
        try {
            const credentials = req.body as { email: string; password: string; };
            if(!credentials || !credentials.email || !credentials.password)
                return res.status(401).json({msg: "INVALID CREDENTIALS"});
    
            accountService.getAccountByEmail(credentials.email).then((account) => {
                if(!account || !account.email || !account.password)
                    return res.status(401).json({msg: "INVALID CREDENTIALS"});

                const validCredentials = bcrypt.compareSync(credentials.password, account.password);
                if(!validCredentials) return res.status(401).json({msg: "INVALID CREDENTIALS"});

                const accessToken = jwt.sign({account: account.email}, String(process.env.JWT_SECRET), {
                    expiresIn: "1d",
                });
                
                return res.status(200).json({ access_token: accessToken });

            }).catch((err) => {
                return res.status(401).json({msg: "INVALID CREDENTIALS", err:err});
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500);
        }
    }

    signUp = async (req: any, res: any) => {
        try {
            const credentials = req.body as { email: string; password: string; };
            if(!credentials || !credentials.email || !credentials.password) return res.status(401).json({msg: "INVALID CREDENTIALS"});

            const accountAvailable = await accountService.checkAccountAvailability(credentials.email);
            if(!accountAvailable) return res.status(400).json({msg: "USER ALREADY EXISTS"});

            const encryptedPassword = bcrypt.hashSync(credentials.password, 10);

            const createdAccount = await accountService.createAccount(String(credentials.email), String(encryptedPassword));
            if(!createdAccount) return res.status(400).json({msg: "USER NOT REGISTERED"});

            return res.status(200).json({msg: "USER REGISTERED"});
        }
        catch (error) {
            console.error(error);
            return res.status(500);
        }
    }
}

export const authController = new AuthController();