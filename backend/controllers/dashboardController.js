const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const { Types } = require("mongoose");

// 🧠 Utility to get date `days` ago
const getDaysAgoDate = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    // ✅ Fetch total income and expenses
    const [totalIncomeAgg, totalExpenseAgg] = await Promise.all([
      Income.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpenses = totalExpenseAgg[0]?.total || 0;
    const totalBalance = totalIncome - totalExpenses;

    // ✅ Time-filtered income and expenses (excluding future)
    const [last60DaysIncomeTransactions, last30DaysExpenseTransactions] = await Promise.all([
      Income.find({
        userId,
        date: {
          $gte: getDaysAgoDate(60),
          $lte: new Date(), // ⛔ Exclude future
        },
      }).sort({ date: -1 }),

      Expense.find({
        userId,
        date: {
          $gte: getDaysAgoDate(30),
          $lte: new Date(), // ⛔ Exclude future
        },
      }).sort({ date: -1 }),
    ]);

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (acc, txn) => acc + txn.amount,
      0
    );

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (acc, txn) => acc + txn.amount,
      0
    );

    // ✅ Fetch latest 5 income and expense transactions (no date filter)
    const [recentIncomes, recentExpenses] = await Promise.all([
      Income.find({ userId }).sort({ date: -1 }).limit(5),
      Expense.find({ userId }).sort({ date: -1 }).limit(5),
    ]);

    const recentTransactions = [...recentIncomes.map(txn => ({
      ...txn.toObject(),
      type: "income",
    })), ...recentExpenses.map(txn => ({
      ...txn.toObject(),
      type: "expense",
    }))].sort((a, b) => b.date - a.date);

    // ✅ Final response
    res.json({
      totalBalance,
      totalIncome,
      totalExpenses,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions,
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
