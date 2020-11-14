import React from 'react'
import styles from './Loading.module.scss'
import spinner from './spinning-circles.svg'
function Loading() {
    return(
        <div className={styles.loadingContainer}>
            <img src={spinner} className={styles.loadingSpinner} alt="Loading"/>
        <h6 className={styles.text}>Loading Playlists...</h6>
        </div>
    )

}

export default Loading;
