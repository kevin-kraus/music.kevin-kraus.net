import './App.scss';
import {fetchPlaylistInfo} from "./service/spotify/apiHandler";
import React, {useEffect, useState} from "react";
import Playlist from "./components/Playlist";
import kkraus from './kkraus_logo.png';
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import config from "./config.json";
import ReactGA from 'react-ga';

function App() {
    const [playlists, setPlaylists] = useState([]);

    const playlistsToFetch = config.SPOTIFY_PLAYLISTS;

    useEffect(() => {
        // Initialize Google Analytics
        if (process.env.NODE_ENV !== 'development') {
            ReactGA.initialize(config.GA_TOKEN);
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
        async function loadPlaylists() {
            return await fetchPlaylistInfo();
            }
        loadPlaylists()
            .then((result)=> {
                result.sort((a, b) => b.lastAddition - a.lastAddition);
                setPlaylists(result);
            });
    }, [playlistsToFetch]);


    return (
        <div className="App">
                <a href="https://kevin-kraus.com">
                    <h1>
                        <img alt={"Kevin Kraus"} className="kkraus" src={kkraus}/>
                    </h1>
                </a>
                <h4 className="headerText">Find my favourite self-created playlists here.<br/>
                    Otherwise <a className="profileLink" href={config.SPOTIFY_PROFILE_URL}>here</a> you can find my Spotify profile.</h4>


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
