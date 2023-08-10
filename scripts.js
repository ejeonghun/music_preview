document.getElementById('search-btn').addEventListener('click', function() {
  document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', function() {
  document.getElementById('modal').classList.add('hidden');
});

document.getElementById('search-submit').addEventListener('click', function() {
  const query = document.getElementById('search-input').value;
  displayArtworks(query);
});

function selectArtwork(src, song, artist, trackViewUrl) {
  document.getElementById('album-art').src = src;
  document.getElementById('song-name').innerText = song;
  document.getElementById('artist-name').innerText = artist;
  document.getElementById('modal').classList.add('hidden');
  const body = document.querySelectorAll('body');
  let styleTag = document.createElement("style");
  styleTag.innerHTML = `
    body::before {
      content: "";
      background-image: url('${src}');
      background-size: cover;
      filter: blur(5px);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  `;
  document.head.appendChild(styleTag);
  document.getElementById("album-art").dataset.appleMusicUrl = trackViewUrl;
}

/*const LAST_FM_API_KEY = '';*/

async function searchApi(query) {
  const itunesUrl = `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=10`;

  try {
    const itunesResponse = await fetch(itunesUrl);

    return {
      itunes: await itunesResponse.json()
    };
  } catch (error) {
    console.error('API 요청 중 에러가 발생했습니다.', error);
    return null;
  }
}
const audioPlayer = new Audio();
async function displayArtworks(query) {
  const data = await searchApi(query);

  if (!data) {
    alert('검색 결과를 불러오지 못했습니다. 다시 시도해주세요.');
    return;
  }

  const { itunes } = data;
  const resultsContainer = document.getElementById('search-results');

  resultsContainer.innerHTML = '';

  itunes.results.forEach((song) => {
    const img = document.createElement('img');
    img.src = song.artworkUrl100.replace("100x100", "1400x1400");
    img.dataset.previewUrl = song.previewUrl;
    img.addEventListener('click', () => {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      audioPlayer.src = song.previewUrl;
      audioPlayer.play();
      selectArtwork(img.src, song.trackName, song.artistName, song.trackViewUrl);
    });

    resultsContainer.appendChild(img);
  });
}

document.getElementById("album-art").addEventListener("click", function () {
  const appleMusicUrl = this.dataset.appleMusicUrl;
  if (appleMusicUrl) {
    window.open(appleMusicUrl, "_blank");
  }
});
