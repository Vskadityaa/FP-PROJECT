// server.js (Node.js backend)
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend access

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)), // Use service account key
  databaseURL: process.env.DATABASE_URL,
});

const db = admin.database();

// Handle Pet Registration
app.post("/registerPet", async (req, res) => {
  try {
    const { address, phone, petName, petBreed, ownerName, petColor } = req.body;

    if (!petName || !ownerName || !phone.match(/^[0-9]{10}$/)) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    const petId = "pet_" + Date.now();

    await db.ref("pets/" + petId).set({
      petId,
      address,
      phone,
      petName,
      petBreed,
      ownerName,
      petColor,
    });

    res.json({ success: true, petId });
  } catch (error) {
    console.error("Error saving pet data:", error);
    res.status(500).json({ error: "Error registering pet." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Move the following code to a separate function or ensure it runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', function() {
        // Get values from input fields
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const petName = document.getElementById('petName').value;
        const petBreed = document.getElementById('petBreed').value;
        const ownerName = document.getElementById('ownerName').value;
        const petColor = document.getElementById('petColor').value;

        // Create a QR code with the collected data
        const qrData = `Address: ${address}, Phone: ${phone}, Pet Name: ${petName}, Pet Breed: ${petBreed}, Owner Name: ${ownerName}, Pet Colour: ${petColor}`;
        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: qrData,
            width: 128,
            height: 128,
        });

        // Enable the download button
        document.getElementById('downloadQR').disabled = false;
    });
});

function generateQRCode() {
    // Get values from input fields
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const petName = document.getElementById('petName').value;
    const petBreed = document.getElementById('petBreed').value;
    const ownerName = document.getElementById('ownerName').value;
    const petColor = document.getElementById('petColor').value;

    // Create a QR code with the collected data
    const qrData = `Address: ${address}, Phone: ${phone}, Pet Name: ${petName}, Pet Breed: ${petBreed}, Owner Name: ${ownerName}, Pet Colour: ${petColor}`;
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: qrData,
        width: 128,
        height: 128,
    });

    // Enable the download button
    document.getElementById('downloadQR').disabled = false;
}
