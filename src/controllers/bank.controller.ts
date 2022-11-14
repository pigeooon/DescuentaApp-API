import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BankService } from "../services/bank.service";
import { IBank } from "../interfaces/bank.interface";

class BankController {

    constructor() {
    }

    getBanks = async (req: Request, res: Response) => {
        BankService.getBanks().then((data) => {
            if(!data || data === null) return res.status(StatusCodes.NOT_FOUND);
            return res.status(StatusCodes.OK).json(data);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }

    getBankList = async (req: Request, res: Response) => {
        BankService.getBanks().then((data) => {
            if(!data || data === null) return res.status(StatusCodes.NOT_FOUND);

            let resData: any[] = [];
            data.map((bank, _id) => {
                resData.push({name: bank.name});
            });

            return res.status(StatusCodes.OK).json(resData);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }

    getBankById = async (req: Request, res: Response) => {
        const bankId = req.params.id;
        
        BankService.getBankById(bankId).then((data) => {
            if(!data || data === null) return res.status(StatusCodes.NOT_FOUND);
            return res.status(StatusCodes.OK).json(data);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }

    createBank = async (req: Request, res: Response) => {
        const bank = req.body as IBank;
        console.log(bank);

        BankService.createBank(bank).then((data) => {
            return res.status(StatusCodes.CREATED).json(data);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }

    updateBank = async (req: Request, res: Response) => {
        const bankId = req.params.id;
        const bank = req.body as IBank;

        BankService.updateBank(bankId, bank).then((data) => {
            return res.status(StatusCodes.OK).json(data);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }

    deleteBank = async (req: Request, res: Response) => {
        const bankId = req.params.id;

        BankService.deleteBank(bankId).then((data) => {
            return res.status(StatusCodes.RESET_CONTENT).json(data);
        })
        .catch((error) => {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error interno del servidor.", error: error});
        });
    }
}

export const bankController = new BankController();