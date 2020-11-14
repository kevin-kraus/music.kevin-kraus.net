<?php
header("Access-Control-Allow-Origin: music.kevin-kraus.com");
require_once("Playlist.php");

class API
{
    private $clientId = "${{ secrets.SPOTIFY_CLIENT_ID }}";
    private $clientSecret = "${{ secrets.SPOTIFY_CLIENT_SECRET }}";
    private $baseUrl = "https://api.spotify.com/v1";
    private $playlists = [
                                 "2gLx9SyUb4yeovTMOs3wQ8",
                                 "4mkKcM3iQF2eSMPyuAQ8AT",
                                 "0UdF4EwkUDueagEjIgoaRe",
                                 "3L7tN4hTe3C7IlseDVSOuA",
                                 "0tqmzFROrtDBtpdB6EKyd8",
                                 "32MbUaD4VMAMfNvXdisnIC",
                                 "6fpG9WRdgBryApAVsLyb6I"];


    public function getAllPlaylists(): array
    {
        $accessToken = self::getAccessToken();
        $allPlaylists = [];
        foreach ($this->playlists as $playlist) {
            $play = self::getPlaylist($playlist, $accessToken);
            self::getLastUpdatedDate($play);
            array_push($allPlaylists, $play);
        }
        return $allPlaylists;
    }

    private function getPlaylist($playlistId, $accessToken): Playlist
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->baseUrl . "/playlists/" . $playlistId . "?fields=name%2Cdescription%2Cimages%2Cexternal_urls%2Curi%2Cfollowers",
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
        $playlist->setExternalUrl($playlistRaw->external_urls->spotify);
        $playlist->setSpotifyUrl($playlistRaw->uri);
        $playlist->setPlaylistId($playlistId);
        return $playlist;
    }


    private function getLastUpdatedDate(Playlist $playlist)
    {
        $playlist_id = $playlist->getPlaylistId();
        $accessToken = self::getAccessToken();

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->baseUrl . "/playlists/" . $playlist_id . "/tracks?fields=total",
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
        $playlist_length = json_decode($response)->total;
        $offset = $playlist_length - 10;


        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->baseUrl . "/playlists/" . $playlist_id . "/tracks?fields=items(added_at)&offset=" . $offset,
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

        $dates = [];
        $items = json_decode($response)->items;
        foreach ($items as $item) {
            try {
                $date = new DateTime($item->added_at);
            } catch (Exception $e) {
                print("Error creating DateTime object.");
            }
            array_push($dates, $date);
        }

        DateTime:
        $newestDate = max($dates);

        $playlist->setLastAddition($newestDate->format("c"));
    }

    private function getAccessToken(): string
    {
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
                "Authorization: Basic " . base64_encode($this->clientId . ":" . $this->clientSecret),
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
