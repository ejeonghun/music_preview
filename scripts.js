document.getElementById('search-btn').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', function() {
  document.getElementById('modal').classList.add('hidden');
});

document.getElementById('search-submit').addEventListener('click', () => {
  const query = document.getElementById('search-input').value;
  displayArtworks(query);
});

function selectArtwork(src, song, artist, trackViewUrl) {
  document.getElementById('album-art').src = src;
  
  const songNameElement = document.getElementById('song-name');
  songNameElement.innerText = song;
  
  const artistNameElement = document.getElementById('artist-name');
  artistNameElement.innerText = artist;

  // 길이가 15자를 초과한 경우 폰트 크기 조정 및 텍스트 다음 줄로 이동
  [songNameElement, artistNameElement].forEach((element) => {
    if (element.innerText.length > 15) {
      element.style.fontSize = '11px';
      element.style.whiteSpace = 'pre-wrap';
      element.style.wordWrap = 'break-word';
    } else {
      element.style.fontSize = 'initial';
      element.style.whiteSpace = 'nowrap';
    }
  });
  document.getElementById('modal').classList.add('hidden');
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
  const encodedQuery = encodeURIComponent(query);
  const itunesUrl = `https://itunes.apple.com/search?term=${encodedQuery}&media=music&entity=song&limit=30`;

  try {
    const itunesResponse = await fetch(itunesUrl, {
      credentials: 'same-origin',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.105 Mobile Safari/537.36',
        'Content-Type': 'application/json',
      },
    });

    if (!itunesResponse.ok) {
      throw new Error(`Request failed: ${itunesResponse.status} ${itunesResponse.statusText}`);
    }

    return {
      itunes: await itunesResponse.json(),
    };
  } catch (error) {
    console.error('API 요청 중 에러가 발생했습니다.', error.message);
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
    const container = document.createElement('div');
    container.classList.add('search-results');
    container.style.textAlign = 'center';
    container.style.marginBottom = '10px';

    const img = document.createElement('img');
    img.src = song.artworkUrl100.replace("100x100", "1400x1400");
    img.dataset.previewUrl = song.previewUrl;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      audioPlayer.src = song.previewUrl;
      audioPlayer.play();
      selectArtwork(img.src, song.trackName, song.artistName, song.trackViewUrl);
      });

    const songTitle = document.createElement('span');
    songTitle.innerText = song.trackName;
    songTitle.style.display = 'block';
    songTitle.style.fontWeight = 'bold';
    songTitle.style.fontSize = '14px';
    songTitle.style.marginTop = '5px';

    const artistName = document.createElement('span');
    artistName.innerText = song.artistName;
    artistName.style.display = 'block';
    artistName.style.fontSize = '14px';

    container.appendChild(img);
    container.appendChild(songTitle);
    container.appendChild(artistName);

    resultsContainer.appendChild(container);
  });
}

document.getElementById("album-art").addEventListener("click", function () {
  const appleMusicUrl = this.dataset.appleMusicUrl;
  if (appleMusicUrl) {
    window.open(appleMusicUrl, "_blank");
  }
});
