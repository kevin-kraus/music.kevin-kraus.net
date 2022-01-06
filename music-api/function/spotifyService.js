// Import btoa
import btoa from 'btoa'
import axios from 'axios'


async function getAuthToken() {
    // Get AccessToken from Spotify Web API
    let uri = 'https://accounts.spotify.com/api/token';
    let clientId = process.env.API_CLIENT_ID
    let clientSecret = process.env.API_CLIENT_SECRET


    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    }

    let body = 'grant_type=client_credentials'

    // Perform POST Request with axios
    const response = await axios.post(uri, body, { headers: headers })
    
    if(response.status === 200) {
        return response.data.access_token
    } else {
        console.log(response.status)
        throw new Error('Error getting access token')
    }
}

async function getPlaylistFromAPI(accessToken, playlistId) {
    // Get Playlist from Spotify Web API
    let uri = 'https://api.spotify.com/v1/playlists/' + playlistId + "?fields=name%2Cdescription%2Cimages%2Cexternal_urls%2Curi%2Cfollowers";
    let headers = {
        'Authorization': 'Bearer ' + accessToken
    }

    // Perform GET Request with axios
    let response = await axios.get(uri, { headers: headers })

    if(response.status === 200) {
        return response.data
    } else {
        console.log(response.status)
        throw new Error('Error getting playlist')
    }
}

async function getLatestAddition(accessToken, playlistId) {
    // Get Latest Addition from Spotify Web API
    let uri = 'https://api.spotify.com/v1/playlists/' + playlistId + "/tracks?fields=total";
    let headers = {
        'Authorization': 'Bearer ' + accessToken
    }

    let totalTrackCount = 0;

    // Perform GET Request with axios
    let response = await axios.get(uri, { headers: headers })
    if(response.status === 200) {
        totalTrackCount = response.data.total
    } else {
        console.log(response.status)
        throw new Error('Error getting track count!')
    }

    let offset = totalTrackCount -10
    
    uri = 'https://api.spotify.com/v1/playlists/' + playlistId + "/tracks?fields=items(added_at)&offset=" + offset + "&limit=10";
    
    // Perform request
    response = await axios.get(uri, { headers: headers })
    if(response.status === 200) {
        // sort by added_at desc and take the first one
        let latestAddition = response.data.items.sort((a, b) => {
            return new Date(b.added_at) - new Date(a.added_at)
        })[0]
        return latestAddition
    } else {
        console.log(response.status)
        throw new Error('Error getting latest addition!')
    }
}

export { getAuthToken, getPlaylistFromAPI, getLatestAddition }