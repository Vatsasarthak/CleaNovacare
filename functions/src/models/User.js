const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');

const usersCollection = db.collection('users');

const UserModel = {
  // Create a new user
  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: data.role || 'customer',
      avatar: data.avatar || null,
      addresses: data.addresses || [],
      wallet: { balance: 0, currency: 'INR' },
      membership: { plan: 'none', expiryDate: null },
      referralCode: data.referralCode || null,
      referredBy: data.referredBy || null,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await usersCollection.add(userData);
    return { _id: docRef.id, ...userData };
  },

  // Find user by email
  async findByEmail(email) {
    const snapshot = await usersCollection.where('email', '==', email).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { _id: doc.id, ...doc.data() };
  },

  // Find user by email or phone
  async findByEmailOrPhone(email, phone) {
    // Check email first
    let snapshot = await usersCollection.where('email', '==', email).limit(1).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { _id: doc.id, ...doc.data() };
    }
    // Then check phone
    snapshot = await usersCollection.where('phone', '==', phone).limit(1).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { _id: doc.id, ...doc.data() };
    }
    return null;
  },

  // Find user by ID
  async findById(id) {
    const doc = await usersCollection.doc(id).get();
    if (!doc.exists) return null;
    return { _id: doc.id, ...doc.data() };
  },

  // Find users by role
  async findByRole(role) {
    const snapshot = await usersCollection.where('role', '==', role).orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      delete data.password; // Don't return password
      return { _id: doc.id, ...data };
    });
  },

  // Compare password
  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};

module.exports = UserModel;
