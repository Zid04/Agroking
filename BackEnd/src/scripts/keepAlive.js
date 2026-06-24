require("dotenv").config();
const mongoose = require("mongoose");

const INTERVAL_MS = 4 * 60 * 1000; // ping toutes les 4 minutes

async function connect() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("KeepAlive : connecté à MongoDB");
}

async function ping() {
  try {
    await mongoose.connection.db.admin().ping();
    console.log(`[${new Date().toISOString()}] KeepAlive ping OK`);
  } catch (err) {
    console.error("KeepAlive ping échoué, tentative de reconnexion...", err.message);
    try {
      await mongoose.disconnect();
      await mongoose.connect(process.env.MONGO_URI);
      console.log("KeepAlive : reconnecté");
    } catch (reconnErr) {
      console.error("KeepAlive : reconnexion échouée", reconnErr.message);
    }
  }
}

connect().then(() => {
  setInterval(ping, INTERVAL_MS);
});
