const API_KEY = "ef60bd6b0b1c4295a34161900250102";
const MUSIC_SUGGESTIONS = {
    rain: "Rainy Mood - Chill Beats 🎶",
    sunny: "Sunny Vibes - Pop Hits ☀️",
    cloudy: "Cloudy Thoughts - LoFi Mix ☁️",
    snow: "Snowy Serenity - Acoustic Set ❄️",
    default: "Everyday Grooves - Mixed Playlist 🎵"
};

document.getElementById("getWeatherButton").addEventListener("click", async () => {
    const location = document.getElementById("locationInput").value.trim();
    const loadingElement = document.getElementById("loading");
    const resultElement = document.getElementById("result");
    
    if (!location) {
        resultElement.innerHTML = "<p style='color: red;'>Please enter a city!</p>";
        return;
    }
    
    loadingElement.classList.remove("hidden");
    resultElement.innerHTML = "";
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadingElement.classList.add("hidden");
        
        if (data.cod !== 200) {
            resultElement.innerHTML = `<p style='color: red;'>${data.message}</p>`;
            return;
        }
        
        if (data.weather && data.weather.length > 0) {
            const condition = data.weather[0].main.toLowerCase();
            let song = MUSIC_SUGGESTIONS.default;
            if (condition.includes("rain")) song = MUSIC_SUGGESTIONS.rain;
            else if (condition.includes("clear")) song = MUSIC_SUGGESTIONS.sunny;
            else if (condition.includes("cloud")) song = MUSIC_SUGGESTIONS.cloudy;
            else if (condition.includes("snow")) song = MUSIC_SUGGESTIONS.snow;
            
            resultElement.innerHTML = `<p><strong>Weather:</strong> ${data.weather[0].description}</p><p><strong>Suggested Song:</strong> ${song}</p>`;
        }
    } catch (error) {
        loadingElement.classList.add("hidden");
        resultElement.innerHTML = "<p style='color: red;'>Error fetching weather. Please try again.</p>";
        console.error("Error fetching weather:", error);
    }
});