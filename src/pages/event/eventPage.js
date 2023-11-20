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


const EventPage = () => {
  const { eventId } = useParams()
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [artists, setArtists] = useState([])

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
        const response = await dispatch(getEventArtistsAsync(eventId))
        setArtists(response.payload)
        console.log(artists)
      } catch (error) {
        console.log('error fetching event Artists')
      }
    }

    fetchData();
    fetchArtists();
  }, [dispatch, eventId]);

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
                  {artists.map((artist) => 
                    <ArtistCard firstName={artist.first_name} lastName={artist.last_name} />
                  )}
                  {/* <ArtistCard firstName='CHARLIE' lastName='PUTH' />
                  <ArtistCard firstName='ELGRAND' lastName='TOTO' />
                  <ArtistCard firstName='JUSTIN' lastName='BIEBER' />
                  <ArtistCard firstName='DRAKE' lastName='DRAKE' /> */}
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
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
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