import mongoose from "mongoose";
import { AccountDocument } from "../interfaces/account.interface";

const accountSchema = new mongoose.Schema<AccountDocument> (
    {
        name: String,
        email: String,
        password: String,
        administrator: Boolean,
        preferences: []   
    }
);

export const Account = mongoose.model<AccountDocument>("Account", accountSchema);