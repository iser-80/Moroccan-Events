import React from 'react'
import styles from '../hero/hero.module.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Login from '../../pages/login/login'

const Hero = () => {
  return (
    <div className={styles.heroSectionContainer}>
      <div className={styles.heroSectionWrapper}>
        <div className={styles.heroSectionIntroduction}>
          <h1 className={styles.heroSectiontitle}>FESTI-<span className={styles.heroSectionstrokeTitle}>FLOW</span></h1>
          <h2 className={styles.heroSectionsousTitle}>Where the Beat Meets the Street</h2>
          <p className={styles.heroSectiondescription}>Moroccan Platform For All Events, Show & Parties With Famous Artists , Soo You Are a Fan Or an Artist go And Contact Us </p>
          <Link to='/login' class={styles['neon-button']}>Get Started<FaArrowRightLong/></Link>
        </div>
      </div>
    </div>
  )
}

export default Hero