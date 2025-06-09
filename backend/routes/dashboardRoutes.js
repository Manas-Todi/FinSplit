const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

// Route to get dashboard data
router.get('/', protect, getDashboardData);

// Export the router
module.exports = router;