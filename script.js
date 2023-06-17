console.log("Hello World");
//Initialize the variables
let songIndex=0;
let audioElement = new Audio('songs/song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');


let songs = [
    {songName: "Tere Vaaste -Vicky Kaushal, Sara Ali Khan", filePath: "songs/song1.mp3" , coverPath: "covers/cover1.jpg"},
    {songName: "System Pa System - R Maan", filePath: "songs/song2.mp3" , coverPath: "covers/cover2.jpg"},
    {songName: "Gulabi Aankhein - SANAM", filePath: "songs/song3.mp3" , coverPath: "covers/cover3.jpg"},
    {songName: "Ishaaron Ishaaron Mein Dil Lene Vale", filePath: "songs/song4.mp3" , coverPath: "covers/cover4.jpg"},
    {songName: "Alfaaz - Haaye Mera Dil", filePath: "songs/song5.mp3" , coverPath: "covers/cover5.jpg"},
    {songName: "Ja Tujhko", filePath: "songs/song6.mp3" , coverPath: "covers/cover6.jpg"}
];
audioElement.play(); 

songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});
// Handle play/pause events
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
      gif.style.opacity = 1;
      updateSongItemPlayButton(true); // Update the song item play buttons
    } else {
      audioElement.pause();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity = 0;
      updateSongItemPlayButton(false); // Update the song item play buttons
    }
  });
  
  // Function to update song item play buttons
  function updateSongItemPlayButton(isPlaying) {
    const songItemPlayButtons = document.querySelectorAll('.songItemPlay');
    songItemPlayButtons.forEach((button) => {
      if (button.id === String(songIndex)) {
        // Update the current song item play button
        if (isPlaying) {
          button.classList.remove('fa-play-circle');
          button.classList.add('fa-pause-circle');
        } else {
          button.classList.remove('fa-pause-circle');
          button.classList.add('fa-play-circle');
        }
      } else {
        // Reset the other song item play buttons
        button.classList.remove('fa-pause-circle');
        button.classList.add('fa-play-circle');
      }
    });
  }
  
  

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = `songs/song${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity = 1;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})



document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/song${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongItemPlayButton(true);
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/song${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongItemPlayButton(true);
})

