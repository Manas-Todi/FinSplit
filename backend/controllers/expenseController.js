const xlsx = require('xlsx');
const Expense = require('../models/Expense');

//add Expense source
exports.addExpense = async (req, res) => {
    const userId = req.user._id;
    const { icon, category, amount, date } = req.body;

    try{
        //validate input
    if (!category || !amount || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newExpense = new Expense({
        userId,
        icon,
        category,
        amount,
        date: new Date(date) 
    });

    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//get all Expense sources
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//delete Expense source
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//download Expense as excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map(item => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        }));

        const wb= require('xlsx').utils.book_new();   // Create a new workbook
        const ws = require('xlsx').utils.json_to_sheet(data); // Convert JSON data to a worksheet
        xlsx.utils.book_append_sheet(wb, ws, 'expense');   // Append the worksheet to the workbook
        xlsx.writeFile(wb, 'expense_details.xlsx');    // Write the workbook to a file
        res.download('expense_details.xlsx');       // Send the file as a download

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};