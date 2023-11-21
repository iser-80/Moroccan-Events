import React, { useEffect, useState } from 'react'
import './eventPage.css'
import satisfactionImage from '../../asset/satisfaction.png';
import enjoyImage from '../../asset/enjoy.png';
import musicImage from '../../asset/music.png';
import testEvent from '../../asset/testEvent.jpg';
import ArtistCard from '../../components/artistCard/artistCard';
import EventCard from '../../components/eventCard/eventCard';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getEventArtistsAsync, getTheEventAsync } from '../../redux_toolkit/slices/api/eventApiSlice';
import { organizationGetEventsAsync } from '../../redux_toolkit/slices/api/organizationApiSlice';


const EventPage = () => {
  const { eventId } = useParams()
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [artists, setArtists] = useState([])
  const [events, setEvents] = useState([])

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


  return (
    <div className='eventContainer'>

        <div className='heroSection'>
            <div className='heroWrapper'>
                <h1>{data.title}</h1>
                <p className='eventDescription'>Powered By Moroccan Events </p>
                <p className='eventDate'>{formatDate(data.date)}</p>
                <div className='tickets'>
                    <button>Buy Tickets</button>
                    <p>+ 1298 visitors</p>
                </div>
            </div>
            <div className='moreInfo'>
              <h1>What You Will Find</h1>
              <div className='eventInfos'>
                <div className='box live'>
                  <img src={satisfactionImage} width={'100px'} height={'100px'} alt='live' />
                  <h2>Live Unique Experience</h2>
                  <p>description</p>
                </div>
                <div className='box listen'>
                  <img src={musicImage} width={'100px'} height={'100px'} alt='live' />
                  <h2>Listen To Your Favorite Music</h2>
                  <p>description</p>
                </div>
                <div className='box enjoy'>
                  <img src={enjoyImage} width={'100px'} height={'100px'} alt='live' />
                  <h2>Enjoy The Moment</h2>
                  <p>description</p>
                </div>
              </div>
            </div>
        </div>

        <div className='aboutEventSection'>

          <div className='aboutEventIntroductionContainer'>
            <div className='aboutEventIntroduction'>
              <img src={testEvent} alt='aboutEvent' />
              <div className='aboutEventIntroductionContent'>
                <h1>This Event Introduction</h1>
                <p>{data.description}</p>
              </div>
            </div>
          </div>  

          <div className='eventArtistsSectionContainer'>
            <div className='eventArtistsSection'>
              <div className='eventArtistsWrapper'>
                <h1>Main Artists Of The Event</h1>
                <div className='eventArtists'>
                  {artists ? artists.map((artist) => 
                    <ArtistCard firstName={artist.first_name} lastName={artist.last_name} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className='eventPastMemoriesContainer'>
            <div className='eventPastMemories'>
                <div className='eventPastMemoriesIntro'>
                  <h1>Our Past Festivals</h1>
                </div>
                <div className='pastEvents'>
                    {events.map((event) => 
                      <EventCard title={event.title} eventId={event._id} date={formatDate(event.date)} description={event.description} />
                    )}
                </div>
            </div>
          </div>

          <div className='ticketsContainer'>
            <div className='ticketsWrapper'>
              <div className='ticket'>
                <h1>Normal</h1>
                <p>Ticket</p>
                <h1 className='ticketPrice'>9,99<span className='dollar'> $</span></h1>
                <button>Buy Now</button>
              </div>
              <div className='ticket'>
                <h1>2+ Pack</h1>
                <p>Ticket</p>
                <h1 className='ticketPrice'>15<span className='dollar'> $</span></h1>
                <button>Buy Now</button>
              </div>
              <div className='ticket'>
                <h1>5+ Pack</h1>
                <p>Ticket</p>
                <h1 className='ticketPrice'>40<span className='dollar'> $</span></h1>
                <button>Buy Now</button>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default EventPage