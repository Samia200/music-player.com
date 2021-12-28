const musicContainer = document.getElementById( 'music-container')
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('preve');
const nextBtn = document.getElementById( 'next');
const audio = document.getElementById('audio');
const progress = document.getElementById ('prograss');
const progressContainer = document.getElementById
('progress-container');
const titel = document.getElementById('titel');
const cover = document.getElementById('cover');

const songs = ['elhadika-siriya','drobi', 'kanas']; 

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song){
cover.src = `${song}.jpeg`;
titel.innerText = song;
audio.src = `music/${song}.mp3`;
};

playBtn.addEventListener("click", ()  =>{
    const isPlaying = musicContainer.classList.contains("play");
    if (isPlaying){
        pauseSong();
    }  else{
        playSong();
    }
  });
 
//play song
function playSong(){
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();

}
//pause song
function pauseSong(){
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause(); 
}

//prev song
function prevSong() {
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    
    playSong();
}
//next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    
    playSong();
}

  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
   
  //update prograss bar
 function updateProgress(e){
     const {duration, currentTime} = e.srcElement;
     const progressPercent = (currentTime / duration) * 100;
     progress.style.width = `${progressPercent}%`;

    }
   
  //time&song update
  audio.addEventListener("timeupdate" , updateProgress);
    
//set prograss bar
function setPrograss(e){
   const width = this.clientWidth;
   const clickX = e.offsetX;
   const duration = audio.duration;

   audio.currentTime = (clickX / width) * duration;
}

//click on  prograss
progressContainer.addEventListener("click", setPrograss);

//song end
audio.addEventListener("ended" , nextSong);
