import Campaign from "../models/campaignmodel.js";
import User from "../models/usermodel.js";

const viewAll = async (req, res) => {
  try {
    const allusers = await User.find({ role: { $ne: "Admin" } });

    res.status(200).json({
      status: "success",
      users: {
        allusers,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewOrganisers = async (req, res) => {
  try {
    const organisers = await User.find({ role: "Organiser" });
    res.status(200).json({
      status: "success",
      organisers,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: "Volunteer" });
    res.status(200).json({
      status: "success",
      volunteers,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("kkkk");
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "successfully deleted",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const participatedCampaigns = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.User.id });

    const campaignIds = user.campaigns;

    const campaigns = await Campaign.find({ _id: { $in: campaignIds } });

    console.log(campaigns);
    res.status(200).json({ status: "Success", campaigns });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const participateCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id;

    const participated = await User.findByIdAndUpdate(
      { _id: req.User.id },
      { $push: { campaigns: campaignId } },
      { new: true }
    );

    const participatedids = await Campaign.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { users: req.User.id } },
      { new: true }
    );

    console.log(participated, participatedids);
    res.status(200).json({ status: "Success", participated, participatedids });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const userControllers = {
  viewAll,
  viewOrganisers,
  viewVolunteers,
  deleteUser,
  participatedCampaigns,
  participateCampaign,
};

export default userControllers;
