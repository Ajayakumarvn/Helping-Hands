import Campaign from "../models/campaignmodel.js";
import User from "../models/usermodel.js";

const viewDisasters = async (req, res) => {
  try {
    const disasters = await Campaign.find({ type: { $eq: "disaster" } });
    res.status(200).json({
      status: "success",
      data: {
        disasters,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: {
        error: err.message,
      },
    });
  }
};

const viewSocial = async (req, res) => {
  try {
    const social = await Campaign.find({ type: { $eq: "social/function" } });
    res.status(200).json({
      status: "success",
      data: {
        social,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: {
        error: err.message,
      },
    });
  }
};

const viewCharity = async (req, res) => {
  try {
    const charity = await Campaign.find({ type: { $eq: "charity" } });
    res.status(200).json({
      status: "success",
      data: {
        charity,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: {
        error: err.message,
      },
    });
  }
};

const disaster_individual = async (req, res) => {
  try {
    const charity_indi = await Campaign.find({
      type: "disaster",
      createdBy: req.User.id,
    });
    res.status(200).json({
      status: "success",
      data: {
        charity_indi,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: {
        error: err.message,
      },
    });
  }
};

const social_individual = async (req, res) => {
  try {
    const social_indi = await Campaign.find({
      type: "social/function",
      createdBy: req.User.id,
    });
    res.status(200).json({
      status: "success",
      data: {
        social_indi,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: {
        error: err.message,
      },
    });
  }
};

const charity_individual = async (req, res) => {
  try {
    const charity_indi = await Campaign.find({
      type: "charity",
      createdBy: req.User.id,
    });
    res.status(200).json({
      status: "success",
      data: {
        charity_indi,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: {
        error: err.message,
      },
    });
  }
};

const addCampaign = async (req, res) => {
  try {
    req.body.createdBy = req.User.id;
    const newCampaign = await Campaign.create(req.body);

    res.status(201).json({
      status: "created",
      data: {
        newCampaign,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: {
        error: err.message,
      },
    });
  }
};

const viewAllCampaigns = async (req, res) => {
  try {
    const allCampaigns = await Campaign.find({});
    console.log(allCampaigns);
    res.status(200).json({
      message: "success",
      allCampaigns,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const myCampaign = async (req, res) => {
  try {
    console.log(req.User.id);
    const myCampaigns = await Campaign.find({ createdBy: req.User.id });
    console.log(myCampaigns);
    res.status(200).json({ status: "success", myCampaigns });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const NotParticipatedCampaigns = async (req, res) => {
  try {
    const npCampaigns = await Campaign.find({ users: { $nin: [req.User.id] } });
    console.log(npCampaigns);
    res.status(200).json({ message: "success", npCampaigns });
  } catch (err) {
    console.log(err.message, err);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewSingleCampaign = async (req, res) => {
  try {
    const singleCampaign = await Campaign.findById({ _id: req.params.id });
    console.log(singleCampaign);
    res.status(200).json({
      message: "success",
      singleCampaign,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const updateCampaign = async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "updated",
      data: {
        updatedCampaign,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: {
        error: err.message,
      },
    });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    await Campaign.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "Deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: {
        error: err.message,
      },
    });
  }
};

const campaignControllers = {
  viewDisasters,
  viewSocial,
  viewCharity,
  disaster_individual,
  social_individual,
  charity_individual,
  addCampaign,
  viewAllCampaigns,
  viewSingleCampaign,
  updateCampaign,
  deleteCampaign,
  NotParticipatedCampaigns,
  myCampaign,
};

export default campaignControllers;
