import React, { useEffect, useState } from 'react'
import styles from './events.module.css'
import EventCard from '../../components/eventCard/eventCard'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMainEventsAsync, getUpComingEventsAsync } from '../../redux_toolkit/slices/api/eventApiSlice'

const Events = () => {
  const [mainEvents, setMainEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [currentMainEventIndex, setCurrentMainEventIndex] = useState(0)
  const [displayedEvents, setDisplayedEvents] = useState(1);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMainEvents = async () => {
      try {
        const response = await dispatch(getMainEventsAsync())
        setMainEvents(response.payload)
      } catch (error) {
        console.log('error while fetching main events')
      }
    }

    const fetchUpcomingEvents = async () => {
      try {
        const response = await dispatch(getUpComingEventsAsync())
        console.log(response.payload)
        setUpcomingEvents(response.payload)
      } catch (error) {
        console.log('error while fetching upcoming events')
      }
    }

    fetchMainEvents()
    fetchUpcomingEvents()
  }, [])

  useEffect(() => {
    //console.log(mainEvents); // Log mainEvents when it changes
    console.log(upcomingEvents)
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

  const totalEventsCount = upcomingEvents.reduce(
    (count, upcomingEvent) => count + upcomingEvent.events.length,
    0
  );

  const seeAllEvents = () => {
    // Update the number of displayed events to the total count
    setDisplayedEvents(totalEventsCount);
  };

  // Function to format the date string
  const formatDate = (dateString) => {
    const fullDate = new Date(dateString);
    return fullDate.toLocaleDateString('en-US'); // Adjust 'en-US' based on your preferred locale
  };

  return (
    <div className={styles.eventsSectionContainer}>
        <div className={styles.eventsSectionWrapper}>
             <div className={styles.eventsSectionevents}>
                <div className={styles.eventsSectionmainEvents}>
                  <div className={styles.eventsSectionmainEventContent}>
                    <div className={styles.eventsSectionMainEventContentInfo}>
                      <p>{formatDate(mainEvents[currentMainEventIndex]?.date)}</p>
                      <h1 className={styles.eventsSectiontitle}>{mainEvents[currentMainEventIndex]?.title}</h1>
                      <p className={styles.eventsSectionMaindesc}>
                        {mainEvents[currentMainEventIndex]?.location} ,  
                        {mainEvents[currentMainEventIndex]?.description}</p>
                      <div className={styles.eventsSectionMainEventContentInfoBtns}> 
                        <button className={styles.eventsSectionreadMore} onClick={readMore} >Read More</button>
                        <button className={styles.eventsSectionbuyTickets}>Buy Tickets</button>
                      </div>
                    </div>
                    <div className={styles.eventsSectionMainEventContentSwitch}> 
                      <button  onClick={prevMainEvent}><FaAngleDoubleLeft/></button>
                      <button  onClick={nextMainEvent} ><FaAngleDoubleRight/></button>
                    </div>
                  </div>
                </div>

                <div className={styles.eventsSectionseeAll}>
                  <p>Events of the Month</p>
                  <button className={styles.eventsSectionseeAllBtn} onClick={seeAllEvents} >See All<FaAngleDoubleRight/></button>
                </div>
                <div className={styles.eventsSectionallEvents}>
                  {upcomingEvents.map((upcomingEvent, index) => (
                    upcomingEvent.events.map((organizationEvent, eventIndex) => (
                      // Conditionally render based on the displayedEvents state
                      (eventIndex < displayedEvents) && (
                        <EventCard
                          key={organizationEvent._id}
                          eventId={organizationEvent._id}
                          title={organizationEvent.title}
                          date={organizationEvent.date}
                          description={organizationEvent.description}
                        />
                      )
                    ))
                  ))}
                </div>

             </div>
        </div>
    </div>
  )
}

export default Events