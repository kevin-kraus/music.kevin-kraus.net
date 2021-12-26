import React, { useState } from 'react';
import styles from './Playlist.module.scss'
import ReactGA from 'react-ga';
import { OpenPlaylistDialog } from '../OpenPlaylistDialog';

function Playlist(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleClose = () => {
        setIsDialogOpen(false);
        ReactGA.event({
            category: 'User',
            action: 'Closed Modal without opening Playlist.'
        });
    };

    const handleCloseWithClick = (external) => {
        setIsDialogOpen(false);
        ReactGA.event({
            category: 'User',
            action: 'Opened Playlist',
            label: external ? 'Browser' : 'App'
        })
    };

    const handleClick = () => {
        setIsDialogOpen(true);
        ReactGA.event({
            category: 'User',
            action: 'Clicked on Playlist',
            label: props.playlist.name
        });
    };


    return (
        <>
            <div onClick={handleClick}>
                <div className={styles.playlistContainer}>
                    <img className={styles.playlistLogo} src={props.playlist.image_url} alt="playlist_logo" />
                    <div className={styles.playlistDetails}>
                        <div className={styles.playlistName}>{props.playlist.name}</div>
                        <div className={styles.playlistDescription}>
                            {props.playlist.description}
                            <div className={styles.playlistLastUpdate}>
                                (last addition: {props.playlist.lastAddition.toLocaleDateString(
                                'de-de'
                            )})
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OpenPlaylistDialog playlist={props.playlist} show={isDialogOpen} handleClose={handleClose} handleClick={handleCloseWithClick}/>
        </>
    )
}

export default Playlist
