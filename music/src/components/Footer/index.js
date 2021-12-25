import React from 'react'
import packageJson from '../../../package.json'
import styles from './Footer.module.scss'


function Footer() {
    return (
        <div className={styles.container}>
            <p>© 2020 - 2021 by <a href="https://github.com/kevin-kraus">Kevin Kraus</a></p>
            <p>Version: {packageJson.version}</p>
            <p>Check out the source code <a href="https://github.com/kevin-kraus/music.kevin-kraus.com">here.</a></p>
            <p><img style={{width: '100px'}} src="https://d0.awsstatic.com/logos/powered-by-aws-white.png"
                    alt="Powered by AWS Cloud Computing"/></p>
        </div>
    )
}


export default Footer
