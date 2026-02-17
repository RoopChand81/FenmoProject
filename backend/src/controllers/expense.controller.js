const Expense = require("../models/expense.model");

exports.createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category required",
      });
    }

    const idempotencyKey = req.headers["idempotency-key"];

    if (!idempotencyKey) {
      return res.status(400).json({
        success: false,
        message: "Missing idempotency key",
      });
    }

    const existing = await Expense.findOne({ idempotencyKey });

    if (existing) {
      return res.status(200).json({
        success: true,
        data: existing,
        message: "Already processed",
      });
    }

    const expense = await Expense.create({
      idempotencyKey,
      amount: Math.round(amount * 100),
      category,
      description: description || "General expense",
      date,
    });

    res.status(201).json({
      success: true,
      data: expense,
      message: "Expense Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const { category, sort } = req.query;

    let filter = {};
    if (category) filter.category = category;

    let query = Expense.find(filter);

    if (sort === "date_desc") {
      query = query.sort({ date: -1 });
    }

    const expenses = await query.exec();

    res.json({
      success: true,
      data: expenses,
      message: "Expenses fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
