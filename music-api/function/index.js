import {getAuthToken, getPlaylistFromAPI, getLatestAddition} from './spotifyService.js';

const playlistIds = [
                                "2gLx9SyUb4yeovTMOs3wQ8",
                                 "4mkKcM3iQF2eSMPyuAQ8AT",
                                 "0UdF4EwkUDueagEjIgoaRe",
                                 "3L7tN4hTe3C7IlseDVSOuA",
                                 "0tqmzFROrtDBtpdB6EKyd8",
                                 "32MbUaD4VMAMfNvXdisnIC",
                                 "6fpG9WRdgBryApAVsLyb6I"
                            ];
                        

const handler = async (event) => {
    // TODO implement
    const accessToken = await getAuthToken();
    const fetchedPlaylists = [];
    
    // Fetch all playlists from Spotify API
    for(let i = 0; i < playlistIds.length; i++) {
        const playlist = await getPlaylistFromAPI(accessToken, playlistIds[i]);
        const lastAdditionDate = await getLatestAddition(accessToken, playlistIds[i]);
        const playlistObject = {
            description: playlist.description,
            imageUrl: playlist.images[0].url,
            name: playlist.name,
            spotifyUrl: playlist.uri,
            externalUrl: playlist.external_urls.spotify,
            lastAddition: lastAdditionDate
        }
        fetchedPlaylists.push(playlistObject);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(fetchedPlaylists)
    };
    return response;
};

export { handler };