# Music Preview 앱
[Go to site](https://ejeonghun.github.io/music_preview).

애플 뮤직의 인스타그램 스토리 공유 기능의 스타일을 오마주하여 만들었음.

Music Preview 앱은 iTunes API를 이용해 사용자가 원하는 곡을 검색하고 간단한 미리듣기 기능을 제공합니다.
앨범 아트와 아티스트명, 곡 제목을 확인할 수 있을 뿐만 아니라, 
선택한 곡을 직접 Apple Music에서 들을 수 있는 링크를 제공합니다.

## 주요 기능
1. 곡 검색:
사용자가 입력한 검색어에 따라 iTunes API에서 곡 정보를 검색합니다.
2. 미리듣기:
검색된 결과 중 원하는 곡을 선택해서 짧게 미리듣기가 가능합니다.
3. Apple Music 연결:
선택한 곡의 앨범 아트를 클릭하면 해당 곡이 있는 Apple Music 페이지로 이동합니다.

## 사용된 기술
HTML, CSS로 구성된 기본 마크업 구조
JavaScript (ES6) 프로그래밍 언어로 인터랙티브 기능 구현
iTunes API를 활용한 곡 정보 검색
## 작동 원리
이 애플리케이션은 다음과 같은 과정을 거쳐 작동합니다:

- 사용자가 검색 버튼을 클릭하여 모달 창이 나타납니다.
- 입력창에 원하는 검색어를 입력하고 검색 버튼을 클릭합니다.
- iTunes API에서 검색어와 관련된 곡 정보를 불러옵니다.
- 검색된 곡들을 모달 창에 결과로 표시됩니다.
- 사용자가 원하는 곡의 이미지를 클릭하면 미리듣기가 재생되며, 선택한 곡의 정보가 메인 화면에 표시됩니다.
- 앨범 아트를 클릭하면, 해당 곡이 있는 Apple Music 페이지로 연결됩니다.


# Music Preview App
[Go to site](https://ejeonghun.github.io/music_preview).

This application pays homage to the styling of Apple Music's Instagram story sharing feature.

Music Preview App utilizes the iTunes API to search for songs by user input, and provides a simple preview feature. Users can check the album art, artist name, and song title. Additionally, it provides a link to listen to the selected song directly on Apple Music.

## Key Features
1. Song Search:
  - The app searches for song information from the iTunes API based on user input.
2. Preview:
  - Users can select and preview a short clip of the desired song from search results.
3. Apple Music Connect:
  - Clicking on the album art of the selected song will take the user to the corresponding Apple Music page.

## Technologies Used
- Basic markup structure using HTML and CSS
- Interactive features implemented using JavaScript (ES6) programming language
- Song information search using iTunes API

## How It Works
The application operates using the following processes:

- Users click the search button and a modal window appears.
- Users enter desired search terms in the input field and click the search button.
- The iTunes API retrieves song information related to the search terms.
- The search results are displayed in the modal window.
- Users click on the image of their desired song to play a preview, and the selected song's information is displayed on the main screen.
- Clicking on the album art connects to the Apple Music page where the selected song is available.

