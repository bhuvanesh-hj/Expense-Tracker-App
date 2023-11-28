const express = require('express');

const app = express();

const userRoutes = require("./routes/user")

app.use(userRoutes);

app.listen(3000);