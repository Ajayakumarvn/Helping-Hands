import express from "express";
import auth from "../controllers/authControl.js";
import transactionControllers from "../controllers/transactionControl.js";

const transactionRouter = express.Router();

transactionRouter.route("/transact").post(transactionControllers.transact);
transactionRouter
  .route("/view")
  .get(auth.protect, transactionControllers.viewTransactions);

export default transactionRouter;
