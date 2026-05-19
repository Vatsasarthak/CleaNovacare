const { db } = require('../config/firebase');

const ordersCollection = db.collection('orders');

const OrderModel = {
  // Create a new order
  async create(data) {
    const orderData = {
      trackingId: data.trackingId,
      customerId: data.customerId,
      riderId: data.riderId || null,
      services: data.services || [],
      totalAmount: data.totalAmount,
      gst: data.gst || 0,
      discount: data.discount || 0,
      payableAmount: data.payableAmount,
      pickupDetails: data.pickupDetails || {},
      deliveryDetails: data.deliveryDetails || {},
      status: data.status || 'pickup_requested',
      timeline: data.timeline || [],
      payment: data.payment || { method: 'cod', status: 'pending' },
      instructions: data.instructions || '',
      images: data.images || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await ordersCollection.add(orderData);
    return { _id: docRef.id, ...orderData };
  },

  // Find order by ID
  async findById(id) {
    const doc = await ordersCollection.doc(id).get();
    if (!doc.exists) return null;
    return { _id: doc.id, ...doc.data() };
  },

  // Find order by tracking ID
  async findByTrackingId(trackingId) {
    const snapshot = await ordersCollection.where('trackingId', '==', trackingId).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { _id: doc.id, ...doc.data() };
  },

  // Get all orders (for admin)
  async findAll() {
    const snapshot = await ordersCollection.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
  },

  // Get orders by customer ID
  async findByCustomerId(customerId) {
    const snapshot = await ordersCollection.where('customerId', '==', customerId).orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
  },

  // Update order
  async updateById(id, updateData) {
    updateData.updatedAt = new Date().toISOString();
    await ordersCollection.doc(id).update(updateData);
    const doc = await ordersCollection.doc(id).get();
    return { _id: doc.id, ...doc.data() };
  }
};

module.exports = OrderModel;
