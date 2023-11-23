import React from 'react'
import styles from './artistCard.module.css'

const ArtistCard = (props) => {
  return (
    <div className={styles.artistCardContainer}>
        <div className={styles.artistCardName}>
            <h1 className={styles.artistCardfirstName}>{props.firstName}</h1>
            <h1 className={styles.artistCardlastName}>{props.lastName}</h1>
        </div>
    </div>
  )
}

export default ArtistCard