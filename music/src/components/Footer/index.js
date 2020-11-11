import React from 'react'
import packageJson from '../../../package.json'
import styles from './Footer.module.scss'


function Footer() {
    return(
    <div className={styles.container}>
        <p>© 2020 by Kevin Kraus</p>
        <p>Version: {packageJson.version}</p>
        <p>Check out the source code <a href="https://github.com/kevin-kraus/music.kevin-kraus.com">here.</a></p>
    </div>
    )
}


export default Footer
