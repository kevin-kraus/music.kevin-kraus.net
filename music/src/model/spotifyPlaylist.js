import he from 'he';
class SpotifyPlaylist {
    name;
    description;
    image_url;
    url;
    constructor(name, description, imageUrl, uri) {
        this.name = name;
        this.description = he.decode(description);
        this.image_url = he.decode(imageUrl);
        this.url = uri;
    }
}
export default SpotifyPlaylist
