const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const addUsers = async (req, res) => {
  const { user, password, email } = req.body;
  if (!user || !password || !email)
    return res
      .status(400)
      .json({ message: "The form has not been properly filled" });

  const existingUser = usersDB.users.find(
    (person) => person.username === user
  );
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }
  try {
    const userPass = await bcrypt.hash(password, 10);
    usersDB.setUsers([
      ...usersDB.users,
      { username: user, password: userPass, email: email },
    ]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB)
    );
    console.log(usersDB.users);
    res.status(201).json({ message: "User Successfully created" });
  } catch (err) {
    res.status(500).json({ message: `Error ${err}` });
  }
};

module.exports = { addUsers };
