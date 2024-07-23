const songs = [
    {
        title: "Husn Tera Taub Tauba",
        artist: "Karan Aujla",
        cover: "th.jpeg",
        src: "Husn Tera Tauba Tauba-(PagalWorld.Ink).mp3"
    },
    {
        title: "_Soulmate",
        artist: "Badshah",
        cover: "soulmate.jpg",
        src: "_Soulmate_320(PagalWorld.com.sb).mp3"
    },
    {
        title: "O Mahi O Mahi",
        artist: "Arijit Singh",
        cover: "o mahi o mahi.jpg",
        src: "O Mahi O Mahi_320(PagalWorld.com.sb).mp3"
    },
    {
        title: "Desi Kalakaar",
        artist: "Honey Singh",
        cover: "desi kalakaar.jpeg",
        src: "Desi Kalakaar_320(PagalWorld.com.sb).mp3"
    },
    {
        title: "Blue Eyes",
        artist: "Honey Singh",
        cover: "blue eyes.jpg",
        src: "Blue Eyes_320(PagalWorld.com.sb).mp3"
    }
];

let currentSongIndex = 0;
let isShuffle = false;
const audio = new Audio(songs[currentSongIndex].src);
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const playlist = document.getElementById('playlist');
const volumeControl = document.getElementById('volume');
const togglePlaylistButton = document.getElementById('toggle-playlist');

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    cover.style.animationPlayState = 'running';
}

function pauseSong() {
    audio.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    cover.style.animationPlayState = 'paused';
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    if (isShuffle) {
        playRandomSong();
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }
}

function playRandomSong() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSongIndex);
    currentSongIndex = randomIndex;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function updateVolume(e) {
    audio.volume = e.target.value;
}

function togglePlaylist() {
    playlist.classList.toggle('show');
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle('active', isShuffle);
}

playButton.addEventListener('click', () => {
    const isPlaying = audio.paused;
    if (isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
});

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
shuffleButton.addEventListener('click', toggleShuffle);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeControl.addEventListener('input', updateVolume);
togglePlaylistButton.addEventListener('click', togglePlaylist);

songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${song.cover}" alt="Cover"><span>${song.title} - ${song.artist}</span>`;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(song);
        playSong();
    });
    playlist.appendChild(li);
});

loadSong(songs[currentSongIndex]);
