const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "User Email and Password are necessary" });
  const existingUser = usersDB.users.find((person) => person.email === email);
  if (!existingUser) return res.status(401);
  const userPass = await bcrypt.compare(password, existingUser.password);
  if (userPass) {
    res.status(200).json({ message: "The user has been verified" });
  } else {
    res.status(402).json({ message: "Wrong Password" });
  }
};

module.exports = { handleLogin };
