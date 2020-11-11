import './App.css';
import {fetchPlaylistInfo} from "./service/spotify/spotifyHandler";
import React, {useEffect, useState} from "react";
import Playlist from "./components/Playlist";
import kkraus from './kkraus_logo.png';
import Loading from "./components/Loading";
import Footer from "./components/Footer";

function App() {
    const [playlists, setPlaylists] = useState([]);

    const playlistsToFetch = [
    ];

    useEffect(async () => {
        var fetchedPlaylists = [];
        var playlistId;
        for (playlistId of playlistsToFetch) {
            var playlist = await fetchPlaylistInfo(playlistId);
            fetchedPlaylists.push(playlist);
        }
        setPlaylists(fetchedPlaylists);
    }, []);


    return (
        <div className="App">
                <a href="https://kevin-kraus.com">
                    <h1>
                        <img className="kkraus" src={kkraus}/>
                    </h1>
                </a>
                <p>Find my most liked playlists here.</p>
                {playlists.map(playlist => (
                    <Playlist playlist={playlist}/>
                ))
                }
                {playlists.length === 0 &&
                <Loading/>
                }
            <Footer/>
        </div>
    );
}

export default App;
