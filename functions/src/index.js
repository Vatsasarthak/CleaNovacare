const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Firebase initializes automatically when imported in models/routes
// No need for a separate database connection step like MongoDB

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📦 Using Firebase Firestore as database`);
});
