import React, { useEffect, useState } from 'react'
import './events.css'
import EventCard from '../../components/eventCard/eventCard'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { organizationGetMainEventsAsync } from '../../redux_toolkit/slices/api/organizationApiSlice'
import { useNavigate } from 'react-router-dom'

const Events = () => {
  const [mainEvents, setMainEvents] = useState([])
  const [currentMainEventIndex, setCurrentMainEventIndex] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMainEvents = async () => {
      try {
        const response = await dispatch(organizationGetMainEventsAsync())
        console.log(response.payload)
        setMainEvents(response.payload)
      } catch (error) {
        console.log('error while fetching main events')
      }
    }

    fetchMainEvents()
  }, [])

  useEffect(() => {
    console.log(mainEvents); // Log mainEvents when it changes
  }, [mainEvents]);


  const prevMainEvent = () => {
    setCurrentMainEventIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : mainEvents.length - 1
    );
  };

  const nextMainEvent = () => {
    setCurrentMainEventIndex((prevIndex) =>
      prevIndex < mainEvents.length - 1 ? prevIndex + 1 : 0
    );
  };

  const readMore = () => {
    const eventId = mainEvents[currentMainEventIndex]._id
    navigate(`/event/${eventId}`)
  }

  // Function to format the date string
  const formatDate = (dateString) => {
    const fullDate = new Date(dateString);
    return fullDate.toLocaleDateString('en-US'); // Adjust 'en-US' based on your preferred locale
  };

  return (
    <div className='eventsContainer'>
        <div className='eventsWrapper'>
             <div className='events'>
                <div className='mainEvents'>
                  <div className='mainEventContent'>
                    <div className='MainEventContentInfo'>
                      <p>{formatDate(mainEvents[currentMainEventIndex]?.date)}</p>
                      <h1 className='title'>{mainEvents[currentMainEventIndex]?.title}</h1>
                      <p className='Maindesc'>
                        {mainEvents[currentMainEventIndex]?.location} ,  
                        {mainEvents[currentMainEventIndex]?.description}</p>
                      <div className='MainEventContentInfoBtns'> 
                        <button className='readMore' onClick={readMore} >Read More</button>
                        <button className='buyTickets'>Buy Tickets</button>
                      </div>
                    </div>
                    <div className='MainEventContentSwitch'> 
                      <button  onClick={prevMainEvent}><FaAngleDoubleLeft/></button>
                      <button  onClick={nextMainEvent} ><FaAngleDoubleRight/></button>
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