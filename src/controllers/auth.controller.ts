import { StatusCodes } from "http-status-codes";

//import { AccountService } from "../services/account.service";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accountService } from "../services/account.service";


class AuthController {

    constructor() {
    }

    getProfile = async (req: any, res: any) => {
        try {
            const authHeader = req.headers.authorization;
            if(!authHeader) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"La sesión de usuario es inválida."});

            const token = authHeader.split(" ")[1];
            jwt.verify(token, String(process.env.JWT_SECRET), async (err:any, data:any) => {
                if(err) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"La sesión de usuario es inválida."});
                
                const accountData = await accountService.getAccountByEmail(data.account);
                return res.status(StatusCodes.OK).json(accountData);
            });
        }
        catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        }
    }

    logIn = async (req: any, res: any) => {
        try {
            const credentials = req.body as { email: string; password: string; };

            if(!credentials) 
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "Las credenciales son obligatorias."});

            if(!credentials.email) 
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "El correo electrónico es obligatorio."});

            if(!credentials.password) 
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "La contraseña es obligatorio."});

            accountService.getAccountByEmail(credentials.email).then((account) => {
                if(!account || !account.email || !account.password)
                    return res.status(StatusCodes.NOT_FOUND).json({msg: "El usuario no está registrado."});

                const validCredentials = bcrypt.compareSync(credentials.password, account.password);
                if(!validCredentials) 
                    return res.status(StatusCodes.UNAUTHORIZED).json({msg: "El correo electrónico y/o la contraseña son incorrectos."});

                const accessToken = jwt.sign({account: account.email}, String(process.env.JWT_SECRET), {
                    expiresIn: "1d",
                });
                
                return res.status(StatusCodes.OK).json({msg: "Has accedido satisfactoriamente.", accessToken: accessToken });

            }).catch(() => {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "El correo electrónico y/o la contraseña son incorrectos."});
            });
        }
        catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        }
    }

    signUp = async (req: any, res: any) => {
        try {
            const credentials = req.body as { name: string; email: string; password: string; };
            
            if(!credentials) 
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "Las credenciales son obligatorias."});

            if(!credentials.name) 
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "El nombre es obligatorio."});

            if(!credentials.email) 
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "El correo electrónico es obligatorio."});

            if(!credentials.password) 
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "La contraseña es obligatorio."});

            const accountAvailable = await accountService.checkAccountAvailability(credentials.email);
            if(!accountAvailable) return res.status(StatusCodes.BAD_REQUEST).json({msg: "El correo electrónico ya está registrado."});

            const encryptedPassword = bcrypt.hashSync(credentials.password, 10);

            const createdAccount = await accountService.createAccount(String(credentials.email), String(encryptedPassword));
            if(!createdAccount) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "La cuenta no fue registrada."});

            const accessToken = jwt.sign({account: createdAccount.email}, String(process.env.JWT_SECRET), {
                expiresIn: "1d",
            });

            return res.status(StatusCodes.OK).json({msg: "El usuario fue registrado satisfactoriamente.", accessToken: accessToken});
        }
        catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        }
    }
}

export const authController = new AuthController();