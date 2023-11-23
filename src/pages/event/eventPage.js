import React, { useEffect, useState } from 'react'
import styles from './eventPage.module.css'
import satisfactionImage from '../../asset/satisfaction.png';
import enjoyImage from '../../asset/enjoy.png';
import musicImage from '../../asset/music.png';
import testEvent from '../../asset/testEvent.jpg';
import ArtistCard from '../../components/artistCard/artistCard';
import EventCard from '../../components/eventCard/eventCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buyEventTicketAsync, getEventArtistsAsync, getTheEventAsync } from '../../redux_toolkit/slices/api/eventApiSlice';
import { organizationGetEventsAsync } from '../../redux_toolkit/slices/api/organizationApiSlice';
import axios from 'axios';


const EventPage = () => {
  const { eventId } = useParams()
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [artists, setArtists] = useState([])
  const [events, setEvents] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getTheEventAsync(eventId));
        setData(response.payload)
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await dispatch(getEventArtistsAsync(eventId));
        if (Array.isArray(response.payload)) {
          setArtists(response.payload);
        } else {
          console.error('Response is not an array:', response.payload);
        }
      } catch (error) {
        console.error('Error fetching event Artists:', error);
      }
    };
    
    const fetchEvents = async () => {
      try {
        const response = await dispatch(organizationGetEventsAsync(eventId))
        setEvents(response.payload)
        console.log(events)
      } catch (error) {
        console.log('error fetching events')
      }
    }

    fetchData();
    fetchArtists();
    fetchEvents()
  }, [dispatch, eventId]);

  useEffect(() => {
    // Log the updated values of artists and events
    console.log('Artists:', artists);
    console.log('Events:', events);
  }, [artists, events]);

  // Function to format the date string
  const formatDate = (dateString) => {
    const fullDate = new Date(dateString);
    return fullDate.toLocaleDateString('en-US'); // Adjust 'en-US' based on your preferred locale
  };

  // check the login (user or org) then get the user
  const user = useSelector((state) => state)

  const buyTicket = async (data) => {
    const response = await axios.post('http://localhost:5000/create-checkout-session', {data})
    if(response.data.url){
      window.location.href = response.data.url
    }
  }

  return (
    <div className={styles.eventPageContainer}>

        <div className={styles.eventPageheroSection}>
            <div className={styles.eventPageheroWrapper}>
                <h1>{data.eventPagetitle}</h1>
                <p className={styles.eventPageeventDescription}>Powered By Moroccan Events </p>
                <p className={styles.eventPageeventDate}>{formatDate(data.date)}</p>
                <div className={styles.eventPagetickets}>
                    <button>Buy Tickets</button>
                    <p>+ 1298 visitors</p>
                </div>
            </div>
            <div className={styles.eventPagemoreInfo}>
              <h1>What You Will Find</h1>
              <div className={styles.eventPageeventInfos}>
                <div className={`${styles.box} ${styles.live}`}>
                  <img src={satisfactionImage} width={'100px'} height={'100px'} alt='live' />
                  <h2>Live Unique Experience</h2>
                  <p>description</p>
                </div>
                <div className={`${styles.eventPagebox} ${styles.eventPagelisten}`}>
                  <img src={musicImage} width={'100px'} height={'100px'} alt='live' />
                  <h2>Listen To Your Favorite Music</h2>
                  <p>description</p>
                </div>
                <div className={`${styles.eventPagebox} ${styles.eventPageenjoy}`}>
                  <img src={enjoyImage} width={'100px'} height={'100px'} alt='live' />
                  <h2>Enjoy The Moment</h2>
                  <p>description</p>
                </div>
              </div>
            </div>
        </div>

        <div className={styles.eventPageaboutEventSection}>

          <div className={styles.eventPageaboutEventIntroductionContainer}>
            <div className={styles.eventPageaboutEventIntroduction}>
              <img src={testEvent} alt='aboutEvent' />
              <div className={styles.eventPageaboutEventIntroductionContent}>
                <h1>This Event Introduction</h1>
                <p>{data.eventPagedescription}</p>
              </div>
            </div>
          </div>  

          <div className={styles.eventPageeventArtistsSectionContainer}>
            <div className={styles.eventPageeventArtistsSection}>
              <div className={styles.eventPageeventArtistsWrapper}>
                <h1>Main Artists Of The Event</h1>
                <div className={styles.eventPageeventArtists}>
                  {artists ? artists.map((artist) => 
                    <ArtistCard firstName={artist.first_name} lastName={artist.last_name} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.eventPageeventPastMemoriesContainer}>
            <div className={styles.eventPageeventPastMemories}>
                <div className={styles.eventPageeventPastMemoriesIntro}>
                  <h1>Our Past Festivals</h1>
                </div>
                <div className={styles.eventPagepastEvents}>
                    {events ? events.map((event) => 
                      <EventCard title={event.title} eventId={event._id} date={formatDate(event.date)} description={event.description} />
                      )
                    : null}
                </div>
            </div>
          </div>

          <div className={styles.eventPageticketsContainer}>
            <div className={styles.eventPageticketsWrapper}>
              <div className={styles.eventPageticket}>
                <h1>Normal</h1>
                <p>Ticket</p>
                <h1 className={styles.eventPageticketPrice}>{data.ticket ? data.ticket : 0}<span className={styles.eventPagedollar}> $</span></h1>
                <button type='submit' onClick={() => buyTicket(data)}>Buy Now</button>
              </div>
              <div className={styles.eventPageticket}>
                <h1>2+ Pack</h1>
                <p>Ticket</p>
                <h1 className={styles.eventPageticketPrice}>{data.ticket ? data.ticket * 2 : 0}<span className={styles.eventPagedollar}>$</span></h1>
                <button>Buy Now</button>
              </div>
              <div className={styles.eventPageticket}>
                <h1>4+ Pack +1free</h1>
                <p>Ticket</p>
                <h1 className={styles.eventPageticketPrice}>{data.ticket ? (data.ticket * 4) : 0}<span className={styles.eventPagedollar}> $</span></h1>
                <button>Buy Now</button>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default EventPage