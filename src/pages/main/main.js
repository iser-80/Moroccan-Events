import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Hero from '../../sections/hero/hero'
import Artists from '../../sections/artists/artists'
import About from '../../sections/about/about'
import Sponsor from '../../sections/news/Sponsor'
import Events from '../../sections/events/events'
import styles from './main.module.css'
import { Element } from 'react-scroll'

const Main = () => {
  return (
    <div className={styles.mainContainer}>
      <Navbar/>
        <Element name='home'>
          <Hero/>
        </Element> 

        <Element name='events'>
          <Events />
        </Element>

        <Element name='artists'>
          <Artists/>
        </Element>

        <Element name='about'>
          <About />
        </Element>

        <Element name='sponsor'>
          <Sponsor />
        </Element>
    </div>
  )
}

export default Main