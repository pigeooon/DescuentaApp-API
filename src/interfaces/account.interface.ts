import mongoose from "mongoose";

export interface IAccount {
    name: string;
    email: string;
    password: string;
    administrator: boolean;
    preferences: [];
}

export type AccountDocument = mongoose.Document & {
    name: string;
    email: string;
    password: string;  
    administrator: boolean;
    preferences: [];
};
