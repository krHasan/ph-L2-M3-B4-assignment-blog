/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use(
    globalErrorHandler as (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => any,
);
app.use(notFound as (req: Request, res: Response, next: NextFunction) => any);

export default app;
