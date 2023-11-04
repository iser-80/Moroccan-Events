import React from 'react'
import './events.css'
import EventCard from '../../components/eventCard/eventCard'
import { FaAngleDoubleRight } from 'react-icons/fa'

const Events = () => {
  return (
    <div className='eventsContainer'>
        <div className='eventsWrapper'>
             <div className='events'>
                <div className='seeAll'>
                  <p>Upcoming Events</p>
                  <button className='seeAllBtn'>See All<FaAngleDoubleRight/></button>
                </div>
                <div className='allEvents'>
                  <EventCard 
                    title='SUNDAY NIGHT'
                    date='27/04'
                    description="Get ready to soak up the summer vibes as we groove to the rhythm of live bands and enjoy mouthwatering cuisine. Whether you're a music enthusiast, a foodie, or just looking for a fun night out, this event has something for everyone."  
                  />
                  <EventCard 
                    title='SUMMER EVENT'
                    date='27/04'
                    description="Get ready to soak up the summer vibes as we groove to the rhythm of live bands and enjoy mouthwatering cuisine. Whether you're a music enthusiast, a foodie, or just looking for a fun night out, this event has something for everyone."
                  />
                  <EventCard 
                    title='SUMMER EVENT'
                    date='27/04'
                    description="Get ready to soak up the summer vibes as we groove to the rhythm of live bands and enjoy mouthwatering cuisine. Whether you're a music enthusiast, a foodie, or just looking for a fun night out, this event has something for everyone."
                  />
                </div>
             </div>
        </div>
    </div>
  )
}

export default Events