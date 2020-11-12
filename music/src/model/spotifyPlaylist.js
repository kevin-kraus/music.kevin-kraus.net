import he from 'he';
class SpotifyPlaylist {
    name;
    description;
    image_url;
    spotifyUrl;
    externalUrl;
    constructor(name, description, imageUrl, spotifyUrl, externalUrl) {
        this.name = name;
        this.description = he.decode(description);
        this.image_url = he.decode(imageUrl);
        this.spotifyUrl = spotifyUrl;
        this.externalUrl = externalUrl;
    }
}
export default SpotifyPlaylist
