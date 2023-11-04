import React from 'react'
import './navbar.css'
import { Link } from 'react-scroll'

const Navbar = () => {
  return (
    <nav>
        <div className='navContainer'>
            <div className='navLogo'>
                events
            </div>
            <ul>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className='navLink' >Home</Link>
                </li>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className='navLink' >Home</Link>
                </li>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className='navLink' >Home</Link>
                </li>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className='navLink' >Home</Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar