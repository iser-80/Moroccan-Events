import React from 'react'
import styles from './navbar.module.css'
import { Link } from 'react-scroll'
import { Router, Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <div className={styles.navbarContainer}>
            <div className={styles.navbarLogo}>
                FESTI-FLOW
            </div>
            <ul>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className={styles.navbarLink} >Home</Link>
                </li>
                <li>
                    <Link to="events" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >Events</Link>
                </li>
                <li>
                    <Link to="artists" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >Artists</Link>
                </li>
                <li>
                    <Link to="about" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >About</Link>
                </li>
                <li>
                    <Link to="sponsor" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >Sponsors</Link>
                </li>
            </ul>
            <div className={styles.authentificationBtns}>
                <RouterLink to='/login' className={styles.authentificationBtn}>Login</RouterLink>
                <RouterLink to='/register' className={styles.authentificationBtn}>Register</RouterLink>
            </div>
        </div>
    </nav>
  )
}

export default Navbar