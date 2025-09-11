import User from "../models/User.js";

const otpGen = async (req, res) => {
  if (!req?.body?.email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const foundUser = await User.findOne({ email: req.body.email }).exec();
    const otp = Math.floor(100000 + Math.random() * 900000);
    if (foundUser) {
      res.status(200).json({ otp });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error, OTP can't be generated right now!", error: error.message });
  }
};

module.exports = {otpGen}