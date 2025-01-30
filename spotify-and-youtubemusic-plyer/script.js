let youtubePlayer;

// Load YouTube Player API
function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtubePlayer', {
        height: '200',
        width: '300',
        playerVars: {
            'autoplay': 0,
            'controls': 1
        }
    });
}

// Play/Pause YouTube Video
document.getElementById("playPauseBtn").addEventListener("click", function () {
    if (youtubePlayer.getPlayerState() === 1) {
        youtubePlayer.pauseVideo();
    } else {
        youtubePlayer.playVideo();
    }
});

// Search Functionality
document.getElementById("searchBtn").addEventListener("click", function () {
    let query = document.getElementById("searchInput").value.trim();
    if (query === "") {
        alert("Please enter a song name!");
        return;
    }

    searchYouTube(query);
    searchSpotify(query);
});

// Search YouTube Video (Fix: Added Working Query)
function searchYouTube(query) {
    const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY"; // 🔑 Replace with Your YouTube API Key

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)} official music video&key=${YOUTUBE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        if (data.items.length > 0) {
            let videoId = data.items[0].id.videoId;
            youtubePlayer.loadVideoById(videoId);
        } else {
            alert("No YouTube video found for this song.");
        }
    })
    .catch(error => console.error("YouTube API Error:", error));
}

// Search Spotify Track (Fix: Correct API Calls & Authentication)
async function searchSpotify(query) {
    const SPOTIFY_CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID"; // 🔑 Replace with Your Spotify Client ID
    const SPOTIFY_CLIENT_SECRET = "YOUR_SPOTIFY_CLIENT_SECRET"; // 🔑 Replace with Your Spotify Client Secret

    try {
        // Step 1: Get Spotify API Token
        let tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
            },
            body: 'grant_type=client_credentials'
        });

        let tokenData = await tokenResponse.json();
        let accessToken = tokenData.access_token;

        // Step 2: Search for the track
        let searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        let searchData = await searchResponse.json();
        if (searchData.tracks.items.length > 0) {
            let trackId = searchData.tracks.items[0].id;
            document.getElementById("spotifyPlayer").src = `https://open.spotify.com/embed/track/${trackId}`;
        } else {
            alert("No Spotify track found for this song.");
        }
    } catch (error) {
        console.error("Spotify API Error:", error);
    }
}
