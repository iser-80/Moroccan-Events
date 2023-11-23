import React from 'react'
import styles from './navbar.module.css'
import { Link } from 'react-scroll'

const Navbar = () => {
  return (
    <nav>
        <div className={styles.navbarContainer}>
            <div className={styles.navbarLogo}>
                events
            </div>
            <ul>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className={styles.navbarLink} >Home</Link>
                </li>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >Home</Link>
                </li>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >Home</Link>
                </li>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >Home</Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar