const songs = [
    {
      name: 'Despacito',
      artist: 'Luis Fonsi ft. Puerto Rican',
      cover: 'Songs-Covers/song 1 cover.jpeg',
      file: 'Songs/song 1.mp3'
    },
    {
      name: 'Levitating ',
      artist: 'Dua Lipa',
      cover: 'Songs-Covers/song 2 cover.jpg',
      file: 'Songs/song 2.mp3'
    },
    {
      name: ' My Heart Will Go On ',
      artist: 'Celine Dion',
      cover: 'Songs-Covers/song 3 cover.jpg',
      file: 'Songs/song 3.mp3'
    }
  ];
  const songList = document.getElementById('song-list');
  const cover = document.getElementById('cover');
  const songName = document.getElementById('song-name');
  const artistName = document.getElementById('artist-name');
  const playBtn = document.getElementById('play-btn');
  const stopBtn = document.getElementById('stop-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const seekSlider = document.getElementById('seek-slider');
  const currentTime = document.getElementById('current-time');
  const duration = document.getElementById('duration');
 
  
  let currentSong = 0;
  let isPlaying = false;
  let updateTimer;
  
  function loadSong(songIndex) {
    stopSong();
    const song = songs[songIndex];
    cover.src = song.cover;
    songName.textContent = song.name;
    artistName.textContent = song.artist;
    audio.src = song.file;
    currentSong = songIndex;
    audio.addEventListener('loadedmetadata', () => {
      duration.textContent = formatTime(audio.duration);
    });
  }
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  }
  function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
    updateTimer = setInterval(updateSeekSlider, 1000);
  }
  
  function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
    clearInterval(updateTimer);
  }
  
  function stopSong() {
    pauseSong();
    audio.currentTime = 0;
    seekSlider.value = 0;
    currentTime.textContent = '0:00';
  }
  
  function prevSong() {
    let prevSongIndex = currentSong - 1;
    if (prevSongIndex < 0) {
      prevSongIndex = songs.length - 1;
    }
    loadSong(prevSongIndex);
    playSong();
  }
  
  function nextSong() {
    let nextSongIndex = currentSong + 1;
    if (nextSongIndex >= songs.length) {
      nextSongIndex = 0;
    }
    loadSong(nextSongIndex);
    playSong();
  }
  
  function updateSeekSlider() {
    const currentTimeValue = Math.floor(audio.currentTime);
    const durationValue = Math.floor(audio.duration);
    seekSlider.value = (currentTimeValue / durationValue) * 100;
    const minutes = Math.floor(currentTimeValue / 60);
    let seconds = currentTimeValue % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    currentTime.textContent = minutes + ':' + seconds;
  }
  
  songList.innerHTML = songs.map((song, index) => {
    return `<li onclick="loadSong(${index})">${song.name} - ${song.artist}</li>`;
  }).join('');
  
  const audio = new Audio();
  audio.addEventListener('ended', nextSong);
  seekSlider.addEventListener('input', () => {
    const seekTo = (audio.duration / 100) * seekSlider.value;
    audio.currentTime = seekTo;
  });
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });
  stopBtn.addEventListener('click', stopSong);
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  
  loadSong(0);
  