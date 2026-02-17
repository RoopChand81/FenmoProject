const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./routes/expense.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);

module.exports = app;
