const express = require("express");

const port = 4001;

const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");

const sequelize = require("./utils/database");

const cors = require("cors");

const Users = require("./models/user");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static("public"));

app.use("/user",userRoutes);

sequelize
  .sync({ force: false })
  .then((res) =>
    app.listen(port, () => {
      console.log(`The server started running on the http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));
