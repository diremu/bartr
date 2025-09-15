const User = require("../model/User")
const bcrypt = require("bcrypt");

const otpGen = async (req, res) => {
  if (!req?.body?.email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const foundUser = await User.findOne({ email: req.body.email }).exec();
    const otp = Math.floor(100000 + Math.random() * 900000);
    if (foundUser) {
      foundUser.otp = otp;
      await foundUser.save();
      res.status(200).json({ otp });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal server error, OTP can't be generated right now!",
        error: error.message,
      });
  }
};

const checkOTP = async (req, res) => {
  if (!req?.body?.otp || !req?.body?.email) {
    return res.status(400).json({ message: "OTP and email are required" });
  }
  try {
    const foundUser = await User.findOne({ email: req.body.email }).exec();
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = foundUser.otp;
    if (String(otp) === String(req.body.otp)) {
      return res.status(200).json({ message: "OTP is valid" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  if (!req?.body?.password) {return res.status(400).json({message: "Password is required"})}
  try {
    const foundUser = await User.findOne({email: req.body.email}).exec()
    const newPassword = await bcrypt.hash(req.body.password, 10)
    foundUser.password = newPassword
    await foundUser.save()
    return res.status(200).json({message: "Password updated successfully" })
  } catch (err) {
    console.log(err)
    res.status(500).json({message: "Internal server error" })
  }
}

module.exports = { otpGen, checkOTP, updatePassword };