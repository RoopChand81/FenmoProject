const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  idempotencyKey: { type: String, unique: true },

  amount: {
    type: Number,
    required: true,
  }, // stored in paise (₹100 = 10000)

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  date: {
    type: Date,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
