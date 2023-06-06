import express from "express";
import auth from "../controllers/authControl.js";
import userControllers from "../controllers/userControl.js";
import campaignControllers from "../controllers/campaignControl.js";

const userRouter = express.Router();

userRouter.route("/signup").post(auth.signup);
userRouter.route("/login").post(auth.login);

userRouter.route("/viewall").get(auth.protect, userControllers.viewAll);
userRouter
  .route("/vieworganizers")
  .get(auth.protect, userControllers.viewOrganisers);
userRouter
  .route("/viewvolunteers")
  .get(auth.protect, userControllers.viewVolunteers);

userRouter
  .route("/delete/:id")
  .delete(auth.protect, userControllers.deleteUser);

userRouter
  .route("/participate/:id")
  .patch(auth.protect, userControllers.participateCampaign);
userRouter
  .route("/participated")
  .get(auth.protect, userControllers.participatedCampaigns);

export default userRouter;
