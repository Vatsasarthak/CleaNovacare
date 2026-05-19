const { onRequest } = require("firebase-functions/v2/https");
const app = require("./src/app");

// Export the Express app as a Cloud Function named 'api'
exports.api = onRequest({ region: "asia-south1", memory: "256MiB" }, app);
