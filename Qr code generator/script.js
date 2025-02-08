function generateQR() {
    let qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = ""; // Clear previous QR code
    let text = document.getElementById("text").value;
    if (text.trim() !== "") {
        new QRCode(qrContainer, {
            text: text,
            width: 200,
            height: 200
        });
    } else {
        alert("Please enter a valid text or URL");
    }
}