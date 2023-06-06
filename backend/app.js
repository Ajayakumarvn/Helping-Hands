import express from "express";
import campaignRouter from "./routes/campaignRouter.js";
import participationRouter from "./routes/participationRouter.js";
import transactionRouter from "./routes/transactionRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json());

app.use("/campaign", campaignRouter);
app.use("/users", userRouter);
// app.use("/participations", participationRouter);
app.use("/transactions", transactionRouter);

export default app;
