import React from 'react'
import '../hero/hero.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Login from '../../pages/login/login'

const Hero = () => {
  return (
    <div className='heroContainer'>
      <div className='heroWrapper'>
        <div className='heroIntroduction'>
          <h1 className='title'>FESTI<span className='strokeTitle'>FLOW</span></h1>
          <h2 className='sousTitle'>Where the Beat Meets the Street</h2>
          <p className='description'>Moroccan Platform For All Events, Show & Parties With Famous Artists , Soo You Are a Fan Or an Artist go And Contact Us </p>
          <Link to='/login' class="neon-button">Get Started<FaArrowRightLong/></Link>
        </div>
      </div>
    </div>
  )
}

export default Hero