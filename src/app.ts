import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import 'dotenv/config';
import { AddressInfo } from "net"
import { router } from './routes';

//express
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false, limit: "15mb" }))
app.use(express.json({ limit: "15mb" }))

//no listeners limit for app events
process.setMaxListeners(0);

//database
mongoose.connect(String(process.env.DB_CONN_STRING)).then(
    () => { console.log("✅ MongoDB successfully connected."); },
).catch((err) => {
    throw err;
});

//routes
app.use('/', router);

//server
const server = app.listen(app.get("port"), "127.0.0.1", () => {
    const { port, address } = server.address() as AddressInfo;
    console.log("\n✅ DESCUENTA-APP API | Listening on:", "http://" + address + ":" + port + " |")
})