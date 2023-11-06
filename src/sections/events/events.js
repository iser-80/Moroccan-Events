import React from 'react'
import './events.css'
import EventCard from '../../components/eventCard/eventCard'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'

const Events = () => {
  return (
    <div className='eventsContainer'>
        <div className='eventsWrapper'>
             <div className='events'>
                <div className='mainEvents'>
                  <div className='mainEventContent'>
                    <div className='MainEventContentInfo'>
                      <p>15/11/2023</p>
                      <h1 className='title'>Festival Gnawa Cycle 2024</h1>
                      <p className='Maindesc'>Merracked & Essaouira, edition 12</p>
                      <div className='MainEventContentInfoBtns'> 
                        <button className='readMore'>Read More</button>
                        <button className='buyTickets'>Buy Tickets</button>
                      </div>
                    </div>
                    <div className='MainEventContentSwitch'> 
                      <button className='readMore'><FaAngleDoubleLeft/></button>
                      <button className='buyTickets'><FaAngleDoubleRight/></button>
                    </div>
                  </div>
                </div>
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