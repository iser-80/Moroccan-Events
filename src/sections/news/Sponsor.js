import React from 'react'
import styles from './Sponsor.module.css'

const Sponsor = () => {
  return (
    <div className={styles.sponsorContainer}>
        <div className={styles.sponsorWrapper}>
          <h1>Sponsors</h1>
          <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale</p>
          <div className={styles.sponsors}>
            <div className={styles.sponsor}>
              <h1>MAWASIN</h1>
            </div>
            <div className={styles.sponsor}>
              <h1>MAROC TELECOM</h1>
            </div>
            <div className={styles.sponsor}>
              <h1>DACIA</h1>
            </div>
            <div className={styles.sponsor}>
              <h1>ORANGE</h1>
            </div>
            <div className={styles.sponsor}>
              <h1>COCA COLA</h1>
            </div>
            <div className={styles.sponsor}>
              <h1>FANTA</h1>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Sponsor