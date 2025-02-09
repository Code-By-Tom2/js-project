function tradeCrypto() {
    const inputField = document.querySelector("#amount");
    const amount = parseFloat(inputField.value);
    
    if (!isNaN(amount) && amount > 0) {
        alert(`You have successfully traded $${amount.toFixed(2)} worth of cryptocurrency.`);
        inputField.value = "";
    } else {
        alert("Please enter a valid positive amount.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd")
        .then(response => response.json())
        .then(data => {
            document.querySelector("#btc-price").textContent = `$${data.bitcoin.usd.toLocaleString()}`;
            document.querySelector("#eth-price").textContent = `$${data.ethereum.usd.toLocaleString()}`;
            document.querySelector("#xrp-price").textContent = `$${data.ripple.usd.toLocaleString()}`;
        })
        .catch(error => {
            console.error("Error fetching prices:", error);
            document.querySelector("#btc-price").textContent = "Unavailable";
            document.querySelector("#eth-price").textContent = "Unavailable";
            document.querySelector("#xrp-price").textContent = "Unavailable";
        });
});
