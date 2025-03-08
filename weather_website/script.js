const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

// Event listeners
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherByCity(city);
    }
});

document.getElementById('geolocation-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        });
    } else {
        showError('Geolocation is not supported by this browser.');
    }
});

// Fetch coordinates from city name
async function getCoordinates(city) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        if (data.length === 0) throw new Error('City not found');
        return { lat: data[0].lat, lon: data[0].lon };
    } catch (error) {
        showError(error.message);
        return null;
    }
}

// Fetch weather data from coordinates
async function getWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data not available');
        const data = await response.json();
        return data;
    } catch (error) {
        showError(error.message);
        return null;
    }
}

// Get weather by city name
async function getWeatherByCity(city) {
    clearWeather();
    showLoading();
    const coords = await getCoordinates(city);
    if (coords) {
        const weatherData = await getWeatherData(coords.lat, coords.lon);
        if (weatherData) {
            displayCurrentWeather(weatherData.current, city);
            displayForecast(weatherData.daily);
            hideError();
        }
    }
    hideLoading();
}

// Get weather by coordinates
async function getWeatherByCoordinates(lat, lon) {
    clearWeather();
    showLoading();
    const weatherData = await getWeatherData(lat, lon);
    if (weatherData) {
        displayCurrentWeather(weatherData.current); // No city name provided
        displayForecast(weatherData.daily);
        hideError();
    }
    hideLoading();
}

// Display current weather
function displayCurrentWeather(current, city = 'Your location') {
    const weatherHtml = `
        <h2>${city}</h2>
        <p>Temperature: ${current.temp}°C</p>
        <p>Condition: ${current.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${current.weather[0].icon}.png" alt="Weather icon">
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind Speed: ${current.wind_speed} m/s</p>
    `;
    document.getElementById('current-weather').innerHTML = weatherHtml;
}

// Display 5-day forecast
function displayForecast(daily) {
    let forecastHtml = '<h3>5-Day Forecast</h3>';
    daily.slice(1, 6).forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        forecastHtml += `
            <div>
                <p>${date}</p>
                <p>Min: ${day.temp.min}°C</p>
                <p>Max: ${day.temp.max}°C</p>
                <p>${day.weather[0].description}</p>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
            </div>
        `;
    });
    document.getElementById('forecast').innerHTML = forecastHtml;
}

// Utility functions
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    document.getElementById('error').innerText = message;
    document.getElementById('error').style.display = 'block';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}

function clearWeather() {
    document.getElementById('current-weather').innerHTML = '';
    document.getElementById('forecast').innerHTML = '';
}