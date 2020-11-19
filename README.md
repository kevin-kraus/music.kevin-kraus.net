# music.kevin-kraus.com
Website to easily share my Spotify playlists.

All playlists are dynamically fetched from the [Spotify Web API](https://developer.spotify.com/).

![Node.js CI](https://github.com/kevin-kraus/music.kevin-kraus.com/workflows/Node.js%20CI/badge.svg?branch=master)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kevin-kraus/music.kevin-kraus.com)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/kevin-kraus/music.kevin-kraus.com?label=version)

## Contribution
If you find any errors / unexpected behaviour, please open an issue in this Repository. For any features you might want 
to have, please also create an issue for it.


## Launching locally for development
- Make sure that you have registered an app in Spotify Developer Portal and added the Client ID and Secret into the 
`music-api/api.php` file.
- remove `music.kevin-kraus.com` CORS-Header in `music-api/api.php`
- start api server locally
- replace api url in `music/config.json`
- run `npm run start`
- open your local browser at `http://localhost:3000`

