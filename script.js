let songIndex = 0;
let audioElement = new Audio("./Songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "Nadaan Parinde",
    filePath: "./Songs/1.mp3",
    coverPath: "./Images/cover 1.jfif",
  },
  {
    songName: "Ae dil hai mushkil",
    filePath: "./Songs/2.mp3",
    coverPath: "./Images/cover 2.jfif",
  },
  {
    songName: "Taras",
    filePath: "./Songs/3.mp3",
    coverPath: "./Images/cover 3.jfif",
  },
  {
    songName: "Tauba Tauba",
    filePath: "./Songs/4.mp3",
    coverPath: "./Images/cover 4.jfif",
  },
  {
    songName: "Aaj Ki Raat",
    filePath: "./Songs/5.mp3",
    coverPath: "./Images/cover 5.jfif",
  },
  {
    songName: "Kahani Suno 2.0",
    filePath: "./Songs/6.mp3",
    coverPath: "./Images/cover 6.jfif",
  },
];

// Update song items with the correct cover and song name
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause button click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;

    // Update the corresponding play button in the song list
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;

    // Update the corresponding play button in the song list
    document.getElementById(songIndex).classList.remove("fa-circle-pause");
    document.getElementById(songIndex).classList.add("fa-circle-play");
  }
});

// Update progress bar as the song plays
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Seek the song when the progress bar is changed
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play buttons to the play icon
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

// Handle individual song play button click
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      songIndex = parseInt(e.target.id);
      if (e.target.classList.contains("fa-circle-pause")) {
        audioElement.pause();
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
      } else {
        makeAllPlays();
        masterSongName.innerText = songs[songIndex - 1].songName;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `./Songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        gif.style.opacity = 1;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      }
    });
  }
);

// Handle Next click
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= songs.length) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `./Songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  gif.style.opacity = 1;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  makeAllPlays();
  document.getElementById(songIndex).classList.remove("fa-circle-play");
  document.getElementById(songIndex).classList.add("fa-circle-pause");
});

// Handle Previous click
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `./Songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  gif.style.opacity = 1;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  makeAllPlays();
  document.getElementById(songIndex).classList.remove("fa-circle-play");
  document.getElementById(songIndex).classList.add("fa-circle-pause");
});

// Auto next songs start
audioElement.addEventListener("ended", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  gif.style.opacity = 1;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  makeAllPlays();
  document.getElementById(songIndex).classList.remove("fa-circle-play");
  document.getElementById(songIndex).classList.add("fa-circle-pause");
});
