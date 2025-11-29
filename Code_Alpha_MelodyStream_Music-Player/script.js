// --- DOM Elements ---
const playerContainer = document.querySelector(".player-container");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artistEl = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const volumeSlider = document.getElementById("volume-slider");

// BONUS Elements
const playlistModal = document.getElementById("playlist-modal");
const playlistBtn = document.getElementById("playlist-btn");
const playlistEl = document.getElementById("playlist");

// --- Song Data Array (Playlist) ---
const songs = [
  {
    title: "Parano",
    artist: "Frozy · DDB",
    name: "song1",
    cover: "https://i.postimg.cc/Y9SchvVw/OIP-(1).jpg",
  },
  {
    title: "Gata Only",
    artist: "FloyyMenor, Cris MJ",
    name: "song2",
    cover: "https://i.postimg.cc/15D9xq1W/OIP-(2).jpg",
  },
  {
    title: "10/10",
    artist: "Shibu",
    name: "song3",
    cover: "https://i.postimg.cc/8zqB79n2/OIP.webp",
  },
  // --- TRENDING CARD SONGS (Must match HTML) ---
  {
    title: "Bapuram Sapure || বাপুরাম সাপুড়ে",
    artist: "Fuad Feat Mila",
    name: "trending1",
    cover: "https://i.postimg.cc/XJ0JmS23/download-(1).webp",
  },
  {
    title: "Lady Killer Romeo",
    artist: "Jeet Gannguli",
    name: "trending2",
    cover: "https://i.postimg.cc/zXHsbbzF/OIP-(1).webp",
  },
  {
    title: "Chikni Chameli",
    artist: "Agneepath | Shreya Ghoshal | Ajay-Atul",
    name: "trending3",
    cover: "https://i.postimg.cc/vmTkycN6/OIP-(3).jpg",
  },
  {
    title: "Badtameez Dil",
    artist: "PRITAM",
    name: "trending4",
    cover: "https://i.postimg.cc/K8wrKjYg/th.webp",
  },
  {
    title: "Tere Liye",
    artist: "Vivek Oberoi | Atif Aslam, Shreya Ghoshal",
    name: "trending5",
    cover: "https://i.postimg.cc/y8pjKn96/OIP-(4).jpg",
  },
];

// --- Player State ---
let songIndex = 0;
let isPlaying = false;

// --- Functions ---

// Time Display Formatting Helper
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Load Song into DOM
function loadSong(song) {
  title.textContent = song.title;
  artistEl.textContent = song.artist;
  audio.src = `audio/${song.name}.mp3`;
  cover.src = song.cover;
  updatePlaylistActive();
  updateMyMusicDisplay(); // Update My Music section whenever song changes
}

// Play Song
function playSong() {
  isPlaying = true;
  playerContainer.classList.add("playing");
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
}

// Pause Song
function pauseSong() {
  isPlaying = false;
  playerContainer.classList.remove("playing");
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audio.pause();
}

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song (Autoplay)
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update Progress Bar & Time Info
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  if (!isNaN(duration)) {
    durationEl.textContent = formatTime(duration);
  }
  currentTimeEl.textContent = formatTime(currentTime);
}

// Set Progress (Seek functionality)
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Set Volume Control
function setVolume() {
  audio.volume = volumeSlider.value;
}

// Playlist Initialization (Only includes first 3 custom songs)
function initPlaylist() {
  songs.slice(0, 3).forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${song.title} - ${song.artist}`;
    listItem.setAttribute("data-index", index);
    listItem.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistEl.appendChild(listItem);
  });
}

// Update active song in playlist
function updatePlaylistActive() {
  const listItems = playlistEl.querySelectorAll("li");
  listItems.forEach((item, index) => {
    item.classList.remove("active");
    if (index === songIndex) {
      item.classList.add("active");
    }
  });
}

// Toggle Playlist Modal
function togglePlaylist() {
  playlistModal.classList.toggle("show");
  playlistBtn.textContent = playlistModal.classList.contains("show")
    ? "Hide Playlist"
    : "Show Playlist";
}

// Update My Music Display
function updateMyMusicDisplay() {
  // Always try to get fresh references to the elements
  const myMusicCoverEl = document.getElementById("mymusic-cover");
  const myMusicTitleEl = document.getElementById("mymusic-title");
  const myMusicArtistEl = document.getElementById("mymusic-artist");

  console.log("Updating My Music...", {
    cover: cover.src,
    title: title.textContent,
    artist: artistEl.textContent,
    elementsFound: !!(myMusicCoverEl && myMusicTitleEl && myMusicArtistEl),
  });

  if (myMusicCoverEl && myMusicTitleEl && myMusicArtistEl) {
    myMusicCoverEl.src = cover.src;
    myMusicTitleEl.textContent = title.textContent;
    myMusicArtistEl.textContent = artistEl.textContent;
    console.log("My Music updated successfully!");
  } else {
    console.log("My Music elements not found", {
      cover: myMusicCoverEl,
      title: myMusicTitleEl,
      artist: myMusicArtistEl,
    });
  }
}

// --- NEW CARD CLICK HANDLER ---
function handleCardClick(event) {
  const card = event.currentTarget;
  const cardTitle = card.querySelector("h4").textContent;
  const cardArtist = card
    .querySelector("p")
    .textContent.replace("Artist: ", "");

  // Find the matching song object in our array
  const clickedSong = songs.find(
    (song) => song.title === cardTitle && song.artist === cardArtist
  );

  if (clickedSong) {
    const newIndex = songs.findIndex((song) => song.name === clickedSong.name);
    songIndex = newIndex;

    loadSong(clickedSong);
    playSong();
  } else {
    console.error(
      "Song data not found for the clicked card. Check the songs array and card HTML."
    );
  }
}

// --- DOM READY EVENT ---
document.addEventListener("DOMContentLoaded", function () {
  // Get navigation elements
  const navLinks = document.querySelectorAll(".main-header nav a");
  const trendingSection = document.querySelector("#trending");
  const trendingSectionContainer = trendingSection
    ? trendingSection.parentElement
    : null;
  const discoverSection = document.querySelector("#discover");
  const myMusicSection = document.querySelector("#mymusic");
  const trendingCards = document.querySelectorAll(".song-card");

  // Navigation click handler
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Hide all sections
      if (trendingSectionContainer) {
        trendingSectionContainer.style.display = "none";
      }
      if (discoverSection) {
        discoverSection.classList.remove("active");
      }
      if (myMusicSection) {
        myMusicSection.classList.remove("active");
      }

      // Get the href target
      const target = this.getAttribute("href").substring(1);

      // Show the appropriate section
      if (target === "trending" && trendingSectionContainer) {
        trendingSectionContainer.style.display = "flex";
      } else if (target === "discover" && discoverSection) {
        discoverSection.classList.add("active");
      } else if (target === "mymusic" && myMusicSection) {
        myMusicSection.classList.add("active");
        updateMyMusicDisplay(); // Update display when navigating to My Music
      }

      // Smooth scroll to section
      const targetSection = document.querySelector(`#${target}`);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Trending card click handler
  trendingCards.forEach((card) => {
    card.addEventListener("click", handleCardClick);
  });

  // Show trending by default
  if (trendingSectionContainer) {
    trendingSectionContainer.style.display = "flex";
  }

  // --- Player Event Listeners ---
  playBtn.addEventListener("click", () =>
    isPlaying ? pauseSong() : playSong()
  );
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  audio.addEventListener("timeupdate", updateProgress);
  progressContainer.addEventListener("click", setProgress);
  audio.addEventListener("ended", nextSong);
  volumeSlider.addEventListener("input", setVolume);
  playlistBtn.addEventListener("click", togglePlaylist);

  // --- Initialization ---
  setVolume();
  loadSong(songs[songIndex]);
  initPlaylist();

  // Wait for metadata to load to get initial duration
  audio.addEventListener("loadedmetadata", () => {
    if (!isNaN(audio.duration)) {
      durationEl.textContent = formatTime(audio.duration);
    }
  });
});
