import React from 'react'
import styles from './eventCard.module.css'
import { useNavigate } from 'react-router-dom';

const EventCard = (props) => {
    const { title, date, description } = props;
    const truncatedDescription = description ? description.substring(0, 170) : '';

    const navigate = useNavigate()

    const readMore = () => {
      const eventId = props.eventId
      navigate(`/event/${eventId}`)
    }

     // Function to format the date string
    const formatDate = (dateString) => {
      const fullDate = new Date(dateString);
      return fullDate.toLocaleDateString('en-US'); // Adjust 'en-US' based on your preferred locale
    };

  return (
    <div className={styles.eventCardContainer} onClick={readMore}>
        <div className={styles.eventCardContent}>
            <h2 className={styles.eventCardTitle}>{title}</h2>
            <p className={styles.eventCardDate}>{formatDate(date)}</p>
            <p className={styles.eventCardDescription}>{truncatedDescription} ...</p>
            {/* <div className={styles.eventCardBtns}>
                <button className={styles.eventCardreadMoreBtn} onClick={readMore} >Read More</button>
                <button className={styles.eventCardbuyBtn}>Buy Tickecs</button>
            </div> */}
        </div>
    </div>
  )
}

export default EventCard