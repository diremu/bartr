const User = require("../model/User");
const bcrypt = require("bcrypt");
const {generateAccessToken} = require('../utils/tokenUtils.js')

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "User Email and Password are necessary" });
  const existingUser = await User.findOne({email}).exec()
  if (!existingUser) return res.status(401);
  const userPass = await bcrypt.compare(password, existingUser.password);
  if (userPass) {
    const accessToken = await generateAccessToken({userId: existingUser._id, email: existingUser.email})
    res.status(200).json({accessToken, message: "The user has been verified" });
  } else {
    res.status(402).json({ message: "Wrong Password" });
  }
};

module.exports = { handleLogin };
