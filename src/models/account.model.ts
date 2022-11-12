import mongoose from "mongoose";
import { AccountDocument } from "../interfaces/account.interface";

const bankSchema = new mongoose.Schema<AccountDocument> (
    {
        email: String,
        password: String,
        administrator: Boolean,
    }
);

export const Account = mongoose.model<AccountDocument>("Account", bankSchema);