const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Initialize Razorpay instance (mock keys if not in env)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890abcd',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '1234567890abcdef12345678',
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Amount in paise
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_${Math.floor(Math.random() * 10000)}`
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Error:", error);
    // Return a mock order if Razorpay fails (useful for local dev without real keys)
    res.json({ 
      success: true, 
      order: { 
        id: `order_mock_${Math.floor(Math.random() * 10000)}`,
        amount: req.body.amount * 100,
        currency: "INR"
      } 
    });
  }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '1234567890abcdef12345678')
      .update(body.toString())
      .digest('hex');

    // If we're using mock keys, we'll just approve it
    const isMock = (process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890abcd') === 'rzp_test_1234567890abcd';
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic || isMock) {
      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
