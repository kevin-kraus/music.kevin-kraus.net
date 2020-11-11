import React from 'react';
import styles from './Playlist.module.scss'
function Playlist(props) {
    return(
        <a href={props.playlist.url}>
            <div className={styles.playlistContainer}>
                <img className={styles.playlistLogo} src={props.playlist.image_url} alt="playlist_logo"/>
                <div className={styles.playlistDetails}>
                    <div className={styles.playlistName}>{props.playlist.name}</div>
                    <div className={styles.playlistDescription}>{props.playlist.description}</div>
                </div>
            </div>
        </a>
    )
}

export default Playlist
