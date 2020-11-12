import axios from 'axios';
import * as qs from "querystring";
import SpotifyPlaylist from "../../model/spotifyPlaylist";
import config from "../../config.json"



function mapToPlaylist(response) {
    var description = response["description"];
    var images = response["imageUrl"];
    var name = response["name"];
    var uri = response["spotifyUrl"];

    return new SpotifyPlaylist(name, description, images, uri);
}

export async function fetchPlaylistInfo() {
    var apiUrl = config.API_URL;
    var fetchedPlaylists = [];
    await axios.get(apiUrl)
        .then(res => {
            var playlists = res["data"];
            for(var playlist of playlists) {
                var play = mapToPlaylist(playlist);
                fetchedPlaylists.push(play);
            }
        });
    return fetchedPlaylists;
    }

