import mongoose from "mongoose";

export interface IAccount {
    email: string;
    password: string;
    administrator: boolean;
}

export type AccountDocument = mongoose.Document & {
    email: string;
    password: string;  
    administrator: boolean;
};
