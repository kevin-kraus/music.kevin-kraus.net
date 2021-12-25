import axios from 'axios';
import SpotifyPlaylist from "../../model/spotifyPlaylist";
import config from "../../config.json"



function mapToPlaylist(response) {
    var description = response["description"];
    var images = response["imageUrl"];
    var name = response["name"];
    var spotifyUrl = response["spotifyUrl"];
    var externalUrl = response["externalUrl"];
    var lastAddition = response["lastAddition"];

    return new SpotifyPlaylist(name, description, images, spotifyUrl, externalUrl, lastAddition);
}

export async function fetchPlaylistInfo() {
    var apiUrl = config.API_URL;
    var fetchedPlaylists = [];
    let response = await axios.get(apiUrl)

    for(var playlist of response.data) {
        var play = mapToPlaylist(playlist);
        fetchedPlaylists.push(play);
    }

    return fetchedPlaylists;
    }

