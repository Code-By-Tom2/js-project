const weatherApiKey = 'ef60bd6b0b1c4295a34161900250102';
const spotifyAccessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById('location-status').innerText = 'Fetching weather for your location...';
            const city = await getCityFromCoords(lat, lon);
            document.getElementById('city').value = city;
            fetchWeather();
        }, () => {
            document.getElementById('location-status').innerText = 'Location access denied. Please enter city manually.';
        });
    }
}

async function getCityFromCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data.name;
}

async function fetchWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }
    
    const weather = await getWeather(city);
    const songUrl = await getSpotifySong(weather);
    document.getElementById('recommendation').innerHTML = `<a href="${songUrl}" target="_blank">Click here for your recommended song!</a>`;
}

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data.weather[0].main;
}

async function getSpotifySong(weather) {
    const weatherPlaylist = {
        Rain: 'Rainy Mood Playlist',
        Clear: 'Sunny Vibes Playlist',
        Clouds: 'Cloudy Day Jams',
        Snow: 'Cozy Winter Tunes',
    };
    const playlistName = weatherPlaylist[weather] || 'Chill Mix';
    
    const searchUrl = `https://api.spotify.com/v1/search?q=${playlistName}&type=playlist`;
    const response = await axios.get(searchUrl, {
        headers: { Authorization: `Bearer ${spotifyAccessToken}` }
    });
    return response.data.playlists.items[0].external_urls.spotify;
}

window.onload = getLocation;
