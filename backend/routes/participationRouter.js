import express from "express";
import participationControllers from "../controllers/participationControl.js";
import auth from "../controllers/authControl.js";

const participationRouter = express.Router();

participationRouter
  .route("/participate")
  .post(auth.protect, participationControllers.participate);
participationRouter
  .route("/viewParticipants")
  .get(auth.protect, participationControllers.viewParticipants);

export default participationRouter;
