import express from "express";
import campaignControllers from "../controllers/campaignControl.js";
import auth from "../controllers/authControl.js";

const campaignRouter = express.Router();

campaignRouter
  .route("/viewAll")
  .get(auth.protect, campaignControllers.viewAllCampaigns);

campaignRouter.route("/viewAllnp").get(campaignControllers.viewAllCampaigns);

campaignRouter
  .route("/view/:id")
  .get(auth.protect, campaignControllers.viewSingleCampaign);

campaignRouter
  .route("/viewmy")
  .get(auth.protect, campaignControllers.myCampaign);

campaignRouter
  .route("/viewNon")
  .get(auth.protect, campaignControllers.NotParticipatedCampaigns);

campaignRouter
  .route("/add")
  .post(auth.protect, campaignControllers.addCampaign);

campaignRouter
  .route("/update/:id")
  .patch(auth.protect, campaignControllers.updateCampaign);
campaignRouter
  .route("/delete/:id")
  .delete(auth.protect, campaignControllers.deleteCampaign);

campaignRouter
  .route("/Disaster")
  .get(auth.protect, campaignControllers.viewDisasters);
campaignRouter
  .route("/Social")
  .get(auth.protect, campaignControllers.viewSocial);
campaignRouter
  .route("/Charity")
  .get(auth.protect, campaignControllers.viewCharity);

campaignRouter
  .route("/self/Disaster")
  .get(auth.protect, campaignControllers.disaster_individual);

campaignRouter
  .route("/self/Social")
  .get(auth.protect, campaignControllers.social_individual);

campaignRouter
  .route("/self/Charity")
  .get(auth.protect, campaignControllers.charity_individual);

campaignRouter
  .route("/self/key")
  .patch(auth.protect, campaignControllers.updateCampaign)
  .delete(auth.protect, campaignControllers.deleteCampaign);

export default campaignRouter;
