import React from 'react'
import './eventCard.css'

const EventCard = (props) => {
    const { title, date, description } = props;
    const truncatedDescription = description ? description.substring(0, 180) : '';
  return (
    <div className='eventCardContainer'>
        <div className='eventCardContent'>
            <h2 className='eventTitle'>{title}</h2>
            <p className='eventDate'>{date}</p>
            <p className='eventDescription'>{truncatedDescription}</p>
            <div className='EventCardBtns'>
                <button className='readMoreBtn'>Read More</button>
                <button className='buyBtn'>Buy Tickecs</button>
            </div>
        </div>
    </div>
  )
}

export default EventCard