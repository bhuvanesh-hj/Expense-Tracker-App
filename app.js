const express = require("express");

const path = require("path");
const helmet = require("helmet");
const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoues = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const forgotPasswordRoutes = require("./routes/forgotPassword");
const reportsRoutes = require("./routes/reports");

const sequelize = require("./utils/database");

const cors = require("cors");

const port = process.env.PORT || 3000;

const Users = require("./models/user.model");
const Expense = require("./models/expense.model");
const Order = require("./models/order.model");
const ForgotPassword = require("./models/forgotPasswordRequests.model");
const DownloadedExpenses = require("./models/downloadedexpense.model");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet({contentSecurityPolicy: false}));
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));

app.use("/", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoues);
app.use("/premium", premiumRoutes);
app.use("/password", forgotPasswordRoutes);
app.use("/reports", reportsRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `views/${req.url}`));
});

Users.hasMany(Expense);
Expense.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

Users.hasMany(ForgotPassword);
ForgotPassword.belongsTo(Users);

Users.hasMany(DownloadedExpenses);
DownloadedExpenses.belongsTo(Users);

sequelize
  .sync({ force: false })
  .then((res) =>
    app.listen(port, () => {
      console.log(`The server started running on the http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));
