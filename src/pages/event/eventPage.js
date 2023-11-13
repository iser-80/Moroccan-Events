import React from 'react'
import './eventPage.css'
import satisfactionImage from '../../asset/satisfaction.png';
import enjoyImage from '../../asset/enjoy.png';
import musicImage from '../../asset/music.png';
import testEvent from '../../asset/testEvent.jpg';
import ArtistCard from '../../components/artistCard/artistCard';
import EventCard from '../../components/eventCard/eventCard';


const EventPage = () => {
  return (
    <div className='eventContainer'>

        <div className='heroSection'>
            <div className='heroWrapper'>
                <h1>Event Title</h1>
                <p className='eventDescription'>Event Description </p>
                <p className='eventDate'>Event Date</p>
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
                <p>some infos about this event</p>
              </div>
            </div>
          </div>  

          <div className='eventArtistsSectionContainer'>
            <div className='eventArtistsSection'>
              <div className='eventArtistsWrapper'>
                <h1>Main Artists Of The Event</h1>
                <div className='eventArtists'>
                  <ArtistCard/>
                  <ArtistCard/>
                  <ArtistCard/>
                  <ArtistCard/>
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