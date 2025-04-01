const clock = document.querySelector('.clock');

for (let n = 1; n <= 12; n++) {
    const numberDiv = document.createElement('div');
    numberDiv.className = 'number';
    numberDiv.textContent = n;

    const angle = n * 30; // 360° / 12 = 30° per number
    const rad = angle * Math.PI / 180; // Convert to radians
    const x = 100 + 90 * Math.sin(rad); // Center (100px) + radius * sin
    const y = 100 - 90 * Math.cos(rad); // Center (100px) - radius * cos

    numberDiv.style.left = `${x - 10}px`; // Adjust for width/2
    numberDiv.style.top = `${y - 10}px`;  // Adjust for height/2
    numberDiv.style.transform = `rotate(${angle}deg)`; // Rotate so base faces center
    clock.appendChild(numberDiv);
}

// Function to update the clock hands
function setTime() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Calculate angles
    const secondAngle = seconds * 6; // 360° / 60 = 6° per second
    const minuteAngle = (minutes + seconds / 60) * 6; // 6° per minute + seconds fraction
    const hourAngle = (hours % 12 + minutes / 60 + seconds / 3600) * 30; // 30° per hour + fractions

    // Apply rotations
    document.querySelector('.second-hand').style.transform = `rotate(${secondAngle}deg)`;
    document.querySelector('.minute-hand').style.transform = `rotate(${minuteAngle}deg)`;
    document.querySelector('.hour-hand').style.transform = `rotate(${hourAngle}deg)`;
}

// Update every second and set initial time
setInterval(setTime, 1000);
setTime();