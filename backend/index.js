// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(fs.readFileSync("./firebase-service-account.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Endpoint to set role
app.post("/set-role", async (req, res) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    return res.status(400).json({ error: "UID and role are required" });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    return res.json({ message: `Role '${role}' assigned to user '${uid}'` });
  } catch (error) {
    console.error("Error setting custom claim:", error);
    return res.status(500).json({ error: "Failed to assign role" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
