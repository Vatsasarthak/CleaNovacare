const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Option 1: Use a service account JSON file (recommended for production)
// Place your serviceAccountKey.json in the config folder
// Option 2: Use environment variables

let serviceAccount;
try {
  serviceAccount = require('./serviceAccountKey.json');
} catch (e) {
  // If no service account file, use env vars or default project
  serviceAccount = null;
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  // For local development without a service account file,
  // set GOOGLE_APPLICATION_CREDENTIALS env var or use emulator
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'agartala-laundry-hub',
  });
}

const db = admin.firestore();

module.exports = { admin, db };
