const Users = require("../models/user");

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
      where: { email: req.body.email },
    });

    const [existUserPassword] = await Users.findAll({
      where: { password: req.body.password },
    });

    // console.log(existUserEmail,existUserPassword);

    if(existUserEmail){
      if(existUserPassword){
        res.status(200).json({message:"User sign-in successful..."})
      }else{
        res.status(401).json({error:"User Password Incorrect..."});
      }
    }else{
      res.status(401).json({error:"User not exist"});
    }
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
      res.status(401).json({ message: "User exist" });
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
