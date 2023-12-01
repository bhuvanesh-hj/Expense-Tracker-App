const Users = require("../models/user");
const bcrypt = require("bcrypt");

exports.usersSignUpForm = (req, res, next) => {
  try {
    res.sendFile("signup.html", { root: "views" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.usersLoginForm = (req, res, next) => {
  try {
    res.sendFile("login.html", { root: "views" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.postLogIn = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email,password);

    const [existUserEmail] = await Users.findAll({
      where: { email },
    });
    // console.log(existUserEmail);
    if (existUserEmail) {
      bcrypt.compare(password, existUserEmail.password, function (err, result) {
        // result == true
        if (err) {
          throw new Error("Something went wrong!");
        }
        if (result) {
          res.status(200).json({ message: "User sign-in successful✅" });
        } else {
          res.status(401).json({ error: "User not authorized!" });
        }
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postSignUp = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const userPassword = req.body.password;
    // console.log(username,email,password);
    const [existEmail] = await Users.findAll({
      where: { email },
    });
    // console.log(existEmail);
    if (existEmail) {
      res.status(401).json({ message: "User exist" });
    } else {
      const saltRounds = 10;
      bcrypt.hash(userPassword, saltRounds, async function (err, password) {
        // Store hash in your password DB.
        if (err) throw new Error("Something went wrong!");
        
        const response = await Users.create({
          username,
          email,
          password,
        });
      });
      res.status(200).json({ message: "User created" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
