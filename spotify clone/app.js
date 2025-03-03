const songs = [
    {
      title: "Song 1",
      artist: "Artist 1",
      album: "Album 1",
      duration: "3:45",
      url: "audio/song1.mp3",
      art: "images/album1.jpg"
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      album: "Album 2",
      duration: "4:20",
      url: "audio/song2.mp3",
      art: "images/album2.jpg"
    }
    // Add more songs with actual file paths
  ];
  
  const playlists = [
    { name: "Playlist 1", songs: [0, 1] },
    { name: "Playlist 2", songs: [1, 0] }
  ];
  
  let currentSongIndex = 0;
  let currentPlaylist = null;
  let shuffle = false;
  let repeat = 'none'; // 'none', 'song', 'playlist'
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  function playSong(index) {
    currentSongIndex = index;
    const song = songs[index];
    const audio = document.getElementById('audio');
    audio.src = song.url;
    audio.play();
    document.getElementById('song-title').textContent = song.title;
    document.getElementById('song-artist').textContent = song.artist;
    document.getElementById('album-art').src = song.art;
    document.getElementById('play-pause').textContent = 'Pause';
  }
  
  function populateSongList(filter = '', playlistIndex = null) {
    let displaySongs = songs;
    if (playlistIndex !== null) {
      displaySongs = playlists[playlistIndex].songs.map(index => songs[index]);
    }
    const filteredSongs = displaySongs.filter(song => 
      song.title.toLowerCase().includes(filter.toLowerCase()) || 
      song.artist.toLowerCase().includes(filter.toLowerCase())
    );
    const songList = document.getElementById('song-list');
    songList.innerHTML = '';
    filteredSongs.forEach(song => {
      const originalIndex = songs.indexOf(song);
      const songItem = document.createElement('div');
      songItem.classList.add('song-item');
      songItem.innerHTML = `
        <img src="${song.art}" alt="${song.album}">
        <div>
          <div>${song.title}</div>
          <div>${song.artist}</div>
        </div>
        <button onclick="playSong(${originalIndex})">Play</button>
      `;
      songList.appendChild(songItem);
    });
  }
  
  function populatePlaylistList() {
    const playlistList = document.getElementById('playlist-list');
    const allSongsLi = document.createElement('li');
    allSongsLi.textContent = 'All Songs';
    allSongsLi.addEventListener('click', () => {
      currentPlaylist = null;
      populateSongList();
    });
    playlistList.appendChild(allSongsLi);
    playlists.forEach((playlist, index) => {
      const li = document.createElement('li');
      li.textContent = playlist.name;
      li.addEventListener('click', () => {
        currentPlaylist = index;
        populateSongList('', currentPlaylist);
      });
      playlistList.appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    populatePlaylistList();
    populateSongList();
  
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');
    const shuffleButton = document.getElementById('shuffle');
    const repeatButton = document.getElementById('repeat');
    const progress = document.getElementById('progress');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const volume = document.getElementById('volume');
    const searchInput = document.getElementById('search-input');
  
    playPauseButton.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
      } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
      }
    });
  
    nextButton.addEventListener('click', () => {
      if (shuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
      } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
      }
      playSong(currentSongIndex);
    });
  
    previousButton.addEventListener('click', () => {
      if (shuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
      } else {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      }
      playSong(currentSongIndex);
    });
  
    shuffleButton.addEventListener('click', () => {
      shuffle = !shuffle;
      shuffleButton.style.color = shuffle ? '#1db954' : '#ffffff';
    });
  
    repeatButton.addEventListener('click', () => {
      if (repeat === 'none') {
        repeat = 'playlist';
        repeatButton.textContent = 'Repeat Playlist';
      } else if (repeat === 'playlist') {
        repeat = 'song';
        repeatButton.textContent = 'Repeat Song';
      } else {
        repeat = 'none';
        repeatButton.textContent = 'Repeat';
      }
    });
  
    audio.addEventListener('timeupdate', () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration || 0;
      progress.value = (currentTime / duration) * 100 || 0;
      currentTimeSpan.textContent = formatTime(currentTime);
      durationSpan.textContent = formatTime(duration);
    });
  
    progress.addEventListener('input', () => {
      audio.currentTime = (progress.value / 100) * audio.duration;
    });
  
    volume.addEventListener('input', () => {
      audio.volume = volume.value;
    });
  
    audio.addEventListener('ended', () => {
      if (repeat === 'song') {
        audio.play();
      } else if (repeat === 'playlist') {
        if (shuffle) {
          currentSongIndex = Math.floor(Math.random() * songs.length);
        } else {
          currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        playSong(currentSongIndex);
      }
    });
  
    searchInput.addEventListener('input', () => {
      populateSongList(searchInput.value, currentPlaylist);
    });
  });