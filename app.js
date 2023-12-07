const express = require("express");

const port = 4001;

const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoues = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const forgotPasswordRoutes = require("./routes/forgotPassword");

const sequelize = require("./utils/database");

const cors = require("cors");

const Users = require("./models/user.model");
const Expense = require("./models/expense.model");
const Order = require("./models/order.model");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static("public"));


app.use("/", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoues);
app.use("/premium", premiumRoutes);
app.use("/password", forgotPasswordRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `views/${req.url}`));
});

Users.hasMany(Expense);
Expense.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

sequelize
  .sync({ force: false })
  .then((res) =>
    app.listen(port, () => {
      console.log(`The server started running on the http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));
