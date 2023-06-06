import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
    trim: true,
    maxlength: [40, "Title can only have a max of 40 characters"],
  },
  description: {
    type: String,
    required: [true, "Body is Required"],
    trim: true,
  },
  venue: {
    type: String,
    default: "nil",
    required: [true, "venue is Required"],
    trim: true,
  },
  date: {
    type: Date,
    default: new Date(),
    required: [true, "Date is Required"],
  },
  type: {
    type: String,
    required: [true, "type is Required"],
    enum: {
      values: ["charity", "disaster", "other"],
      message: "possible values are charity,disaster,other",
    },
  },
  target: {
    type: Number,
    required: [true, "Fund is Required"],
    default: 0,
  },
  createdBy: {
    type: String,
    required: [true, "Created By required"],
  },
  users: [String],
  // createdByRole: {
  //   type: String,
  //   required: [true, "createdByRole is Required"],
  //   enum: {
  //     values: ["admin", "organiser"],
  //     message: "possible values are admin & Organiser",
  //   },
  // },
});

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
