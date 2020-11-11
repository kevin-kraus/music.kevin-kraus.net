import he from 'he';
class SpotifyPlaylist {
    name;
    description;
    image_url;
    url;
    constructor(name, description, images, uri) {
        this.name = name;
        this.description = he.decode(description);
        this.image_url = images[0]["url"];
        this.url = uri;
    }
}
export default SpotifyPlaylist
