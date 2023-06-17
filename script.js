console.log("Hello World");
// Initialize the variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  { songName: "Tere Vaaste -Vicky Kaushal, Sara Ali Khan", filePath: "songs/song1.mp3", coverPath: "covers/cover1.jpg" },
  { songName: "System Pa System - R Maan", filePath: "songs/song2.mp3", coverPath: "covers/cover2.jpg" },
  { songName: "Gulabi Aankhein - SANAM", filePath: "songs/song3.mp3", coverPath: "covers/cover3.jpg" },
  { songName: "Ishaaron Ishaaron Mein Dil Lene Vale", filePath: "songs/song4.mp3", coverPath: "covers/cover4.jpg" },
  { songName: "Alfaaz - Haaye Mera Dil", filePath: "songs/song5.mp3", coverPath: "covers/cover5.jpg" },
  { songName: "Ja Tujhko", filePath: "songs/song6.mp3", coverPath: "covers/cover6.jpg" }
];

// Function to play a song
function playSong(index) {
  if (index === songIndex && !audioElement.paused) {
    // Song is already playing, so pause it
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    updateSongItemPlayButton(false);
  } else {
    // Song is different or paused, so play it
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    updateSongItemPlayButton(true);
  }
}

// Function to update song item play buttons
function updateSongItemPlayButton(isPlaying) {
  const songItemPlayButtons = document.querySelectorAll('.songItemPlay');
  songItemPlayButtons.forEach((button, i) => {
    if (i === songIndex) {
      if (isPlaying) {
        button.classList.remove('fa-play-circle');
        button.classList.add('fa-pause-circle');
      } else {
        button.classList.remove('fa-pause-circle');
        button.classList.add('fa-play-circle');
      }
    } else {
      button.classList.remove('fa-pause-circle');
      button.classList.add('fa-play-circle');
    }
  });
}

// Play button click event listener
masterPlay.addEventListener('click', () => {
  playSong(songIndex);
});

// Song item play button click event listeners
songItems.forEach((element, i) => {
  element.getElementsByClassName('songItemPlay')[0].addEventListener('click', () => {
    playSong(i);
  });
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
  // Update seek bar
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('click', (e) => {
  // Calculate the new seek position based on the click event
  const seekTime = (e.offsetX / myProgressBar.clientWidth) * audioElement.duration;
  audioElement.currentTime = seekTime;
});

audioElement.addEventListener('ended', () => {
  // Play the next song when the current song ends
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

document.getElementById('next').addEventListener('click', () => {
  // Play the next song
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
  // Play the previous song
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});