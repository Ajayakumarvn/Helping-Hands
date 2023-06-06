import User from "../models/usermodel.js";

const participate = async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: false,
    });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewParticipants = async (req, res) => {
  try {
    const participants = await User.find({ participate: { $eq: true } });
    res.status(200).json({
      status: "success",
      participants,
    });
  } catch (err) {
    res.json(400).json({
      error: err.message,
    });
  }
};

const participationControllers = {
  participate,
  viewParticipants,
};

export default participationControllers;
