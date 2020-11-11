import axios from 'axios';
import * as qs from "querystring";
import SpotifyPlaylist from "../../model/spotifyPlaylist";
import config from "../../config.json"

var client_id = config.SPOTIFY_CLIENT_ID;
var client_secret = config.SPOTIFY_CLIENT_SECRET;
var access_token;


async function authorizeApplication() {
    var encodedClient = btoa(client_id + ":" + client_secret);
    var spotifyUrl = "https://accounts.spotify.com/api/token";
    var body = {"grant_type": "client_credentials"};
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + encodedClient
    };
   await axios.post(spotifyUrl,
        qs.stringify(body), {headers: headers})
        .then(res => {
            access_token = res["data"]["access_token"];
        })
}

function mapToPlaylist(response) {
    var description = response["description"];
    var images = response["images"];
    var name = response["name"];
    var uri = response["uri"];

    return new SpotifyPlaylist(name, description, images, uri);
}

export async function fetchPlaylistInfo(playlistId) {
    if(access_token === undefined) {
        await authorizeApplication();
    }
    var fieldsToFetch = "name,description,images,uri";
    var spotifyUrl = "https://api.spotify.com/v1/playlists/" + playlistId + "?fields="+ fieldsToFetch;
    var headers = {"Authorization" : "Bearer " + access_token};
    var playlist = {};
    await axios.get(spotifyUrl, {headers: headers})
        .then(res => {
            playlist = mapToPlaylist(res.data);
        });
    return playlist;
    }

