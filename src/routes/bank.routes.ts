import { Router } from "express";
import BankController from "../controllers/bank.controller";

export default class BankRoutes {
    private path = '/banks';
    private router = Router();
    private bankController = new BankController();

    constructor() {
        this.createRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private createRoutes() {
        this.router.get(`${this.path}`, this.bankController.getBanks);

        this.router.get(`${this.path}/:id`, this.bankController.getBankById);

        this.router.post(`${this.path}`, this.bankController.createBank);

        this.router.put(`${this.path}/:id`, this.bankController.updateBank);

        this.router.delete(`${this.path}/:id`, this.bankController.deleteBank);
    }
}