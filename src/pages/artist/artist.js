import React from 'react'
import './artist.css'
import EventCard from '../../components/eventCard/eventCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ArtistPage = () => {
  return (
    <div className='artistContainer'>
        <div className='artistInfo'>
            <h1 className='artistFN'>Artist FName</h1>
            <h1 className='artistLN'>Artist LName</h1>
            <p className='artistIntro'>L'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914).</p>
        </div>     
        <div className='artistEvents'>
            <h1>Contributed Events</h1>
            <div className='allArtistEvents'>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1.8}
                >
                    <SwiperSlide>
                        <EventCard/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <EventCard/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <EventCard/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div> 
    </div>
  )
}

export default ArtistPage