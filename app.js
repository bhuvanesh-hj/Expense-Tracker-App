const express = require("express");

const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");

const sequelize = require("./utils/database");

const cors = require('cors');

const Users = require("./models/user");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static("public"));



app.use(userRoutes);

sequelize
  .sync({ force: false })
  .then((res) => app.listen(4000))
  .catch((err) => console.log(err));
