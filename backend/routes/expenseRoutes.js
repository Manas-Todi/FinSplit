const express= require("express");
const { protect } = require("../middleware/authMiddleware.js");
const {
    getAllExpense,
    addExpense,
    downloadExpenseExcel,
    deleteExpense,
} = require("../controllers/expenseController.js");

const router = express.Router();

router.post("/add", protect, addExpense);   // Add Expense
router.get("/get", protect, getAllExpense); // Get all Expenses
router.get("/downloadExcel", protect, downloadExpenseExcel); 
router.delete("/:id", protect, deleteExpense); 

module.exports = router;



