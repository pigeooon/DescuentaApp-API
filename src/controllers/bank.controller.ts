import { Request, Response } from "express";
import { BankService } from "../services/bank.service";
import { BankType } from "../types/bank.type";

export default class BankController {

    constructor() {
    }

    public getBanks(req: Request, res: Response) {
        BankService.getBanks().then((data) => {
            if(!data || data === null) return res.status(404);
            return res.status(200).json(data);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }

    public getBankById(req: Request, res: Response) {
        const bankId = req.params.id;
        
        BankService.getBankById(bankId).then((data) => {
            if(!data || data === null) return res.status(404);
            return res.status(200).json(data);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }

    public createBank(req: Request, res: Response) {
        const bank = req.body as BankType;
        console.log(bank);

        BankService.createBank(bank).then((data) => {
            return res.status(201).json(data);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }

    public updateBank(req: Request, res: Response) {
        const bankId = req.params.id;
        const bank = req.body as BankType;

        BankService.updateBank(bankId, bank).then((data) => {
            return res.status(200).json(data);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }

    public deleteBank(req: Request, res: Response) {
        const bankId = req.params.id;

        BankService.deleteBank(bankId).then((data) => {
            return res.status(205).json(data);
        })
        .catch((error) => {
            return res.status(500).json(error);
        });
    }
}