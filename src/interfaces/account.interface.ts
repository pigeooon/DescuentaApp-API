import mongoose from "mongoose";

export interface IAccount {
    email: string;
    password: string;
    administrator: number;
}

export type AccountDocument = mongoose.Document & {
    email: string;
    password: string;  
    administrator: number;
};
