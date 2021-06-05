const musicPlayerContainer = document.getElementById('music-player-container');
const musicPlayerList = document.getElementById('player-list');

const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const artistName = document.getElementById('artist-name');
const songTitle = document.getElementById('song-title');
const songPlayTime = document.getElementById('song-play-time');

// Music album
const album = {
  artist: 'Whitney Houston',
  title: 'The Bodyguard',
  songs: [
    'I Will Always Love You',
    'I Have Nothing',
    'Im Every Woman',
    'Run To You',
    'Queen Of The Night',
  ],
};

console.log(album['artist']);

// Song Index of album
let songIndex = 0;

// Initial load song
let artist = album['artist'];
let title = album['title'];
let songs = album['songs'];

loadSong(artist, title, songs[songIndex]);

// Update song info
function loadSong(artist, album, songs) {
  artistName.innerText = artist;
  songTitle.innerText = `${album} · ${songs}`;
  audio.src = `music/${songs}.mp3`;
}

// Play song
function playSong() {
  musicPlayerContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// Pause song
function pauseSong() {
  musicPlayerContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(artist, title, songs[songIndex]);
  playSong();
}

// Prev Song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = album['songs'].length - 1;
  }

  loadSong(artist, title, songs[songIndex]);
  playSong();
}

// Update progressb bar
function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlay = musicPlayerContainer.classList.contains('play');

  isPlay ? pauseSong() : playSong();
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressBar.addEventListener('click', setProgress);
