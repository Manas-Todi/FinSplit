const xlsx = require('xlsx');
const Income = require('../models/Income');

//add income source
exports.addIncome = async (req, res) => {
    const userId = req.user._id;
    const { icon, source, amount, date } = req.body;

    try{
        //validate input
    if (!source || !amount || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date: new Date(date) 
    });

    await newIncome.save();
    res.status(201).json({ message: 'Income source added successfully', income: newIncome });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//get all income sources
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//delete income source
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: 'Income source deleted successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//download income as excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        }));

        const wb= require('xlsx').utils.book_new();   // Create a new workbook
        const ws = require('xlsx').utils.json_to_sheet(data); // Convert JSON data to a worksheet
        xlsx.utils.book_append_sheet(wb, ws, 'Income');   // Append the worksheet to the workbook
        xlsx.writeFile(wb, 'income_details.xlsx');    // Write the workbook to a file
        res.download('income_details.xlsx');       // Send the file as a download

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};