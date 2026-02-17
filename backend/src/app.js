const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./routes/expense.route");

const app = express();

app.use(cors());
app.use(express.json());

/* ✅ Home Route */
app.get("/", (req, res) => {
  res.send("🚀 Fenmo Expense Tracker API is running");
});

/* Expense Routes */
app.use("/expenses", expenseRoutes);

module.exports = app;
