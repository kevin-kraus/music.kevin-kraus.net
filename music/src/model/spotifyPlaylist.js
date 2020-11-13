import he from 'he';
import moment from 'moment'
class SpotifyPlaylist {
    name;
    description;
    image_url;
    spotifyUrl;
    externalUrl;
    lastAddition;
    constructor(name, description, imageUrl, spotifyUrl, externalUrl, lastAddition) {
        this.name = name;
        this.description = he.decode(description);
        this.image_url = he.decode(imageUrl);
        this.spotifyUrl = spotifyUrl;
        this.externalUrl = externalUrl;
        this.lastAddition = moment(lastAddition);
    }


}
export default SpotifyPlaylist
