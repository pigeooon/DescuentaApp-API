import { StatusCodes } from "http-status-codes";
import { accountService } from "../services/account.service";


class AccountController {

    constructor() {
    }

    updateAccount = async (req: any, res: any) => {
        try {
            const userEmail = req.account;
            const { preferences } = req.body;

            accountService.updateAccount(userEmail, preferences).then((data) => {
                return res.status(StatusCodes.OK).json(data);
        })
        }
        catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        }
    }
}

export const accountController = new AccountController();