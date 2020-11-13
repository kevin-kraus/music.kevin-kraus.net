import React, {useState} from 'react';
import styles from './Playlist.module.scss'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Playlist(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <div onClick={handleShow}>
                <div className={styles.playlistContainer}>
                    <img className={styles.playlistLogo} src={props.playlist.image_url} alt="playlist_logo"/>
                    <div className={styles.playlistDetails}>
                        <div className={styles.playlistName}>{props.playlist.name}</div>
                        <div className={styles.playlistDescription}>
                            {props.playlist.description}
                            <div className={styles.playlistLastUpdate}>
                                (last addition: {props.playlist.lastAddition.format('DD.MM.YYYY HH:mm')})
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Open Playlist "{props.playlist.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please choose whether you have Spotify installed or not.</Modal.Body>
                <Modal.Footer>
                    <Button href={props.playlist.externalUrl} variant="secondary" onClick={handleClose}>
                        Open in Browser
                    </Button>
                    <Button href={props.playlist.spotifyUrl} variant="primary" onClick={handleClose}>
                        Open in Spotify
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Playlist
