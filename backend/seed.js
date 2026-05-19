const User = require('./src/models/User');

async function seed() {
  console.log('🌱 Seeding Firebase Firestore...');

  try {
    // Check if admin already exists
    const existingAdmin = await User.findByEmail('admin@cleanova.in');
    if (existingAdmin) {
      console.log('✅ Admin user already exists, skipping seed.');
      process.exit(0);
    }

    // Create Admin
    const admin = await User.create({
      name: 'Admin CLEANOVA',
      email: 'admin@cleanova.in',
      phone: '9999999999',
      password: 'password123',
      role: 'admin'
    });
    console.log('✅ Admin created:', admin.email);

    // Create a test rider
    const rider = await User.create({
      name: 'Rajesh Rider',
      email: 'rider@cleanova.in',
      phone: '8888888888',
      password: 'password123',
      role: 'rider'
    });
    console.log('✅ Rider created:', rider.email);

    // Create a test customer
    const customer = await User.create({
      name: 'Test Customer',
      email: 'customer@cleanova.in',
      phone: '7777777777',
      password: 'password123',
      role: 'customer'
    });
    console.log('✅ Customer created:', customer.email);

    console.log('\n🎉 Seed completed successfully!');
    console.log('Admin login: admin@cleanova.in / password123');
    console.log('Rider login: rider@cleanova.in / password123');
    console.log('Customer login: customer@cleanova.in / password123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
