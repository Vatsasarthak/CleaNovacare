const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const { services, totalAmount, payableAmount, pickupDetails, payment } = req.body;
    const trackingId = 'CLN-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const order = await Order.create({
      trackingId,
      customerId: req.user._id,
      services,
      totalAmount,
      payableAmount,
      pickupDetails,
      payment,
      timeline: [{ status: 'pickup_requested', message: 'Your pickup has been requested.', timestamp: new Date().toISOString() }]
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get order by tracking ID
// @route   GET /api/orders/track/:id
router.get('/track/:id', async (req, res) => {
  try {
    const order = await Order.findByTrackingId(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Populate customer and rider names
    if (order.customerId) {
      const customer = await User.findById(order.customerId);
      order.customerName = customer ? customer.name : 'Unknown';
      order.customerPhone = customer ? customer.phone : '';
    }
    if (order.riderId) {
      const rider = await User.findById(order.riderId);
      order.riderName = rider ? rider.name : 'Unknown';
      order.riderPhone = rider ? rider.phone : '';
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update order status (Admin/Rider only)
// @route   PUT /api/orders/:id/status
router.put('/:id/status', protect, authorize('admin', 'rider'), async (req, res) => {
  try {
    const { status, message } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const timeline = order.timeline || [];
    timeline.push({ status, message, timestamp: new Date().toISOString() });

    const updatedOrder = await Order.updateById(req.params.id, { status, timeline });

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get all orders (Admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const orders = await Order.findAll();

    // Populate customer names
    for (let order of orders) {
      if (order.customerId) {
        const customer = await User.findById(order.customerId);
        order.customerId = customer ? { _id: customer._id, name: customer.name } : { name: 'Unknown' };
      }
      if (order.riderId) {
        const rider = await User.findById(order.riderId);
        order.riderId = rider ? { _id: rider._id, name: rider.name } : null;
      }
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/me
router.get('/me', protect, async (req, res) => {
  try {
    const orders = await Order.findByCustomerId(req.user._id);

    // Populate rider names
    for (let order of orders) {
      if (order.riderId) {
        const rider = await User.findById(order.riderId);
        order.riderId = rider ? { _id: rider._id, name: rider.name, phone: rider.phone } : null;
      }
    }

    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Assign rider to order
// @route   PUT /api/orders/:id/assign-rider
router.put('/:id/assign-rider', protect, authorize('admin'), async (req, res) => {
  try {
    const { riderId } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const timeline = order.timeline || [];
    timeline.push({ status: 'rider_assigned', message: 'A rider has been assigned to your order.', timestamp: new Date().toISOString() });

    const updatedOrder = await Order.updateById(req.params.id, { riderId, status: 'rider_assigned', timeline });

    // Populate rider details
    const rider = await User.findById(riderId);
    updatedOrder.riderId = rider ? { _id: rider._id, name: rider.name, phone: rider.phone } : null;

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Assign rider error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
