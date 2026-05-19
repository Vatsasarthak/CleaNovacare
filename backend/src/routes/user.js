const express = require('express');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all customers
// @route   GET /api/users/customers
router.get('/customers', protect, authorize('admin'), async (req, res) => {
  try {
    const customers = await User.findByRole('customer');
    res.json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get all riders
// @route   GET /api/users/riders
router.get('/riders', protect, authorize('admin'), async (req, res) => {
  try {
    const riders = await User.findByRole('rider');
    res.json({ success: true, count: riders.length, data: riders });
  } catch (error) {
    console.error('Get riders error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
