import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
      role: req.body.role,
    });
    console.log(newUser);
    const token = signToken(newUser._id);
    const role = req.body.role;
    const name = req.body.name;
    res.status(200).json({
      status: "Created",
      token,
      role,
      name,
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");
    const correct = await user.correctPassword(password, user.password);
    const role = user.role;
    const name = user.name;
    if (!user || !correct) {
      throw new Error("Incorrect Email or Password");
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      role,
      name,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const protect = async (req, res, next) => {
  try {
    // 1.getting token and check if its there

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("You are not logged in!");
    }

    // 2.verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error(
        "The user belonging to this token does no longer exists."
      );
    }

    req.User = currentUser;

    next();
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const auth = {
  signup,
  login,
  protect,
};

export default auth;
