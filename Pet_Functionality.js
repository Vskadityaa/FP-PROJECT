
document.getElementById("petForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form reload

    const ownerName = document.getElementById("ownerName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const petName = document.getElementById("petName").value.trim();
    const petBreed = document.getElementById("petBreed").value.trim();
    const petColor = document.getElementById("petColor").value.trim();

    if (!petName || !ownerName || !phone.match(/^[0-9]{10}$/)) {
        alert("Please enter a valid Pet Name, Owner Name, and a 10-digit Phone Number.");
        return;
    }

    // Send Data to Server
    try {
        const response = await fetch("http://localhost:5000/registerPet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ownerName, phone, address, petName, petBreed, petColor })
        });

        const result = await response.json();
        if (result.success) {
            alert("Pet Registered Successfully!");
            generateQRCode(result.petId, petName, ownerName, phone, petBreed, petColor, address);
        } else {
            alert("Error registering pet.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server error. Please try again.");
    }
});

// Function to Generate QR Code
function generateQRCode(petId, petName, ownerName, phone, petBreed, petColor, address) {
    const qrData = `Pet ID: ${petId}
Owner: ${ownerName}
Phone: ${phone}
Pet: ${petName}
Breed: ${petBreed}
Color: ${petColor}
Address: ${address}`;

    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = "";
    new QRCode(qrCodeContainer, { text: qrData, width: 200, height: 200 });

    document.getElementById("downloadQR").disabled = false;
}

// QR Code Download Function
document.getElementById("downloadQR").addEventListener("click", function () {
    const qrCodeCanvas = document.querySelector("#qrcode canvas");
    if (qrCodeCanvas) {
        const link = document.createElement("a");
        link.href = qrCodeCanvas.toDataURL("image/png");
        link.download = "Pet_QR_Code.png";
        link.click();
    } else {
        alert("Generate a QR code first!");
    }
});
