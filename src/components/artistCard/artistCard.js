import React from 'react'
import './artistCard.css'

const ArtistCard = (props) => {
  return (
    <div className='artistCardContainer'>
        <div className='artistName'>
            <h1 className='firstName'>{props.firstName}</h1>
            <h1 className='lastName'>{props.lastName}</h1>
        </div>
    </div>
  )
}

export default ArtistCard