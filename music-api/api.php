<?php
header("Access-Control-Allow-Origin: music.kevin-kraus.com");
require_once("Playlist.php");

class API
{
    private $clientId = "";
    private $clientSecret = "";
    private $playlists = [];


    public function getAllPlaylists(): array
    {
        $accessToken = self::getAccessToken();
        $allPlaylists = [];
        foreach ($this->playlists as $playlist) {
            $play = self::getPlaylist($playlist, $accessToken);
            array_push($allPlaylists, $play);
        }
        return $allPlaylists;
    }

    private function getPlaylist($playlistId, $accessToken): Playlist
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://api.spotify.com/v1/playlists/" . $playlistId . "?fields=name%2Cdescription%2Cimages%2Curi%2Cfollowers",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_POSTFIELDS => "",
            CURLOPT_HTTPHEADER => [
                "Authorization: Bearer " . $accessToken
            ],
        ]);

        $response = curl_exec($curl);

        curl_close($curl);


        $playlistRaw = json_decode($response);

        // Cast Raw Playlist to class
        $playlist = new Playlist();

        $playlist->setDescription($playlistRaw->description);
        $playlist->setImageUrl($playlistRaw->images[0]->url);
        $playlist->setName($playlistRaw->name);
        $playlist->setSpotifyUrl($playlistRaw->uri);
        $playlist->setPlaylistId($playlistId);
        return $playlist;
    }

    private function getAccessToken(): string
    {
        $requestUrl = "https://accounts.spotify.com/api/token";
        $requestBody = "";
        $requestHeaders = "";

        // Request AccessToken from Spotify Web API

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://accounts.spotify.com/api/token",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "grant_type=client_credentials",
            CURLOPT_HTTPHEADER => [
                "Authorization: Basic " . base64_encode($this->clientId.":".$this->clientSecret),
                "Content-Type: application/x-www-form-urlencoded"
            ],
        ]);

        $response = curl_exec($curl);
        $res = json_decode($response);
        return $res->access_token;
    }

}
$api = new API();
if ($_SERVER["REQUEST_URI"] === "/api/getPlaylists") {
    echo(json_encode($api->getAllPlaylists()));
} else {
    http_response_code(404);
    die();
}