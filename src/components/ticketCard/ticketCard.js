import React from 'react'
import styles from './ticketCard.module.css'

const TicketCard = () => {
  return (
    <div className={styles.ticketCardContainer}>
        <div className={styles.ticketCardleftPart}>
            <div className={styles.ticketCardeventTitleContainer}>
                <h1 className={`${styles.ticketCardeventTitle} ${styles.ticketCardop1}`}>Event Title</h1>
                <h1 className={`${styles.ticketCardeventTitle} ${styles.ticketCardop2}`}>Event Title</h1>
                <h1 className={`${styles.ticketCardeventTitle} ${styles.ticketCardop3}`}>Event Title</h1>
                <h1 className={`${styles.ticketCardeventTitle} ${styles.ticketCardop4}`}>Event Title</h1>
            </div>
            <div className={styles.ticketCardtimeLocationContainer}>
                <h1 className={styles.ticketCardlocation}>Casablanca</h1>
                <h1 className={styles.ticketCardtime}>10/10/2024</h1>
            </div>
        </div>
        <div className={styles.ticketCardrightPart}>
            <div className={styles.ticketCardeventPriceContainer}>
                <h1 className={styles.ticketCardticketType}>Normal</h1>
                <h1 className={styles.ticketCardticketPrice}>20$</h1>
            </div>
        </div>
    </div>
  )
}

export default TicketCard