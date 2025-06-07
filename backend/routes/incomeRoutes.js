const express= require("express");
const { protect } = require("../middleware/authMiddleware.js");
const {
    getAllIncome,
    addIncome,
    downloadIncomeExcel,
    deleteIncome,
} = require("../controllers/incomeController.js");

const router = express.Router();

router.post("/add", protect, addIncome);   // Add income
router.get("/get", protect, getAllIncome); // Get all income
router.get("/downloadExcel", protect, downloadIncomeExcel); // Download income as Excel
router.delete("/:id", protect, deleteIncome); // Delete income by ID

module.exports = router;



