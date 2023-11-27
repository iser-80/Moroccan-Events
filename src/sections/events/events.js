import React, { useEffect, useState } from 'react'
import styles from './events.module.css'
import EventCard from '../../components/eventCard/eventCard'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'
import { FaPen } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMainEventsAsync, getUpComingEventsAsync } from '../../redux_toolkit/slices/api/eventApiSlice'
import { organizationGetMainEventsAsync, organizationGetPastEventsAsync } from '../../redux_toolkit/slices/api/organizationApiSlice';

const Events = () => {
  const [mainEvents, setMainEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [currentMainEventIndex, setCurrentMainEventIndex] = useState(0)
  const [displayedEvents, setDisplayedEvents] = useState(1);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authUser = useSelector((state) => state.authUser)
  const authOrganization = useSelector((state) => state.authOrganization)

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
        setUpcomingEvents(response.payload)
      } catch (error) {
        console.log('error while fetching upcoming events')
      }
    }

    const fetchOrganizationMainEvents = async () => {
      try {
        const response = await dispatch(organizationGetMainEventsAsync())
        if(response && response.payload){
          setMainEvents(response.payload)
        }
      } catch (error) {
        console.log('error while fetching organization main events')
      }
    }

    const fetchOrganizationPastEvents = async () => {
      try {
        const response = await dispatch(organizationGetPastEventsAsync())
        if(response && response.payload){
          setUpcomingEvents(response.payload)
        }
      } catch (error) {
        console.log('error while fetching organization main events')
      }
    }

    if(authOrganization.organizationInfo !== null){
      fetchOrganizationMainEvents()
      fetchOrganizationPastEvents()
    }else{
      fetchMainEvents()
      fetchUpcomingEvents()
    }

  }, [mainEvents, upcomingEvents])


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

  const modify = () => {
    const eventId = mainEvents[currentMainEventIndex]._id
    navigate(`/editEvent/${eventId}`)
  }

  const totalEventsCount = Array.isArray(upcomingEvents)
  ? upcomingEvents.reduce(
      (count, upcomingEvent) =>
        count + (Array.isArray(upcomingEvent.events) ? upcomingEvent.events.length : 0),
      0
    )
  : 0;


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
              {/* for organization we will show all its upcoming events */}
                <div className={styles.eventsSectionmainEvents}>
                  <div className={styles.eventsSectionmainEventContent}>
                    <div className={styles.eventsSectionMainEventContentInfo}>
                      <p>{formatDate(mainEvents[currentMainEventIndex]?.date)}</p>
                      <h1 className={styles.eventsSectiontitle}>{mainEvents[currentMainEventIndex]?.title}</h1>
                      <p className={styles.eventsSectionMaindesc}>
                        {mainEvents[currentMainEventIndex]?.location} ,  
                        {mainEvents[currentMainEventIndex]?.description ? mainEvents[currentMainEventIndex]?.description.substring(0, 200) + '...' : ''}</p>
                      <div className={styles.eventsSectionMainEventContentInfoBtns}> 
                        <button className={styles.eventsSectionreadMore} onClick={readMore} >Read More</button>
                        {authOrganization.organizationInfo !== null ?
                          <button className={styles.eventsSectionbuyTickets} onClick={modify} ><FaPen/>Modifiy</button>
                        :
                          <>
                            {authUser.userInfo !== null ?
                              <button className={styles.eventsSectionbuyTickets}>Buy Tickets</button>
                            :
                              <button disabled className={styles.eventsSectionbuyTicketsDis}>Buy Tickets</button>
                            }
                          </>
                        }
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
                  {authOrganization.organizationInfo !== null
                    ? 
                    <>
                      { upcomingEvents.length > 0 ?
                        upcomingEvents.map((upcomingEvent, index) => (
                          <EventCard
                            key={upcomingEvent._id}
                            eventId={upcomingEvent._id}
                            title={upcomingEvent.title}
                            date={upcomingEvent.date}
                            description={upcomingEvent.description}
                          />
                      ))
                    :
                    <EventCard
                      title='test'
                      date={new Date()}
                      description='test'
                  />
                    }
                    </>
                    : Array.isArray(upcomingEvents) &&
                      upcomingEvents.map((upcomingEvent, index) =>
                        Array.isArray(upcomingEvent.events) &&
                        upcomingEvent.events.map((organizationEvent) => (
                          <EventCard
                            key={organizationEvent._id}
                            eventId={organizationEvent._id}
                            title={organizationEvent.title}
                            date={organizationEvent.date}
                            description={organizationEvent.description}
                          />
                        ))
                      )}
                </div>
             </div>
        </div>
    </div>
  )
}

export default Events