import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Hero from '../../sections/hero/hero'
import Artists from '../../sections/artists/artists'
import About from '../../sections/about/about'
import Sponsor from '../../sections/news/Sponsor'
import Events from '../../sections/events/events'

const Main = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <Events />
        <Artists/>
        <About />
        <Sponsor />
    </>
  )
}

export default Main