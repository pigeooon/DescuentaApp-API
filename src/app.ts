import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import 'dotenv/config';
import router from './routes';

//express
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//database
mongoose.connect(String(process.env.DB_CONN_STRING)).then(
    () => { console.log("✅ App successfully connected to MongoDB."); },
).catch((err) => {
    console.log("❌ MongoDB connection error.");
    console.error(err);
});

//api
app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Hello world.' });
});

app.use('/', router);

//deployment
(async () => {
    app.listen(app.get("port"), () => {
        console.log("✅ App is running on port %d.", app.get("port"));
    });
})();

export default app;