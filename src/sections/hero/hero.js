import React, { useEffect } from 'react'
import styles from '../hero/hero.module.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'
import { useSelector } from 'react-redux'

const Hero = () => {

  const authUser = useSelector((state) => state.authUser)
  const authOrganization = useSelector((state) => state.authOrganization)

  return (
    <div className={styles.heroSectionContainer}>
      <div className={styles.heroSectionWrapper}>
        <div className={styles.heroSectionIntroduction}>
          <h1 className={styles.heroSectiontitle}>FESTI-<span className={styles.heroSectionstrokeTitle}>FLOW</span></h1>
          <h2 className={styles.heroSectionsousTitle}>Where the Beat Meets the Street</h2>
          <p className={styles.heroSectiondescription}>Moroccan Platform For All Events, Show & Parties With Famous Artists , Soo You Are a Fan Or an Artist go And Contact Us </p>
          {authUser.userInfo !== null ?
            <LinkS to="events" spy={true} smooth={true} duration={500} class={styles['neon-button']}>Check Events<FaArrowRightLong/></LinkS>
          :
          <>
            {authOrganization.organizationInfo !== null ?
              <Link to='/addEvent' class={styles['neon-button']}>Create Event<FaArrowRightLong/></Link>
            :
              <Link to='/login' class={styles['neon-button']}>Get Started<FaArrowRightLong/></Link>
            }
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default Hero