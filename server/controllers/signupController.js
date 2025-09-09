const User = require("../model/User");
const bcrypt = require("bcrypt");
const {generateAccessToken, generateRefreshToken} = require("../utils/tokenUtils")

const addUsers = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password)
    return res
      .status(400)
      .json({ message: "The form has not been properly filled" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const userPass = await bcrypt.hash(password, 10);
    const accessToken = generateAccessToken({userId: existingUser._id, email: existingUser.email})
    const refreshToken = generateRefreshToken({userId: existingUser._id, email: existingUser.email})
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: userPass,
      refreshToken
    });
    await newUser.save();
    res.status(201).json({accessToken, message: "User Successfully created" });
  } catch (err) {
    res.status(500).json({ message: `Error ${err}` });
  }
};

module.exports = { addUsers };
