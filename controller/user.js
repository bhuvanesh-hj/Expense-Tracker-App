const Users = require("../models/user");

exports.usersForm = (req, res, next) => {
  try {
    res.sendFile("index.html", { root: "views" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.postSignUp = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // console.log(username,email,password);
    const existEmail = await Users.findAll({
      where: { email: req.body.email },
    });
    // console.log(existEmail);
    if (existEmail.length > 0) {
      res.status(207).json({ message: "User exist" });
    } else {
      const response = await Users.create({
        username,
        email,
        password,
      });
      res.status(200).json({ message: "User created" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
