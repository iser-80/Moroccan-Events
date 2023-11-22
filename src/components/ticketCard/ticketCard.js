import React from 'react'
import './ticketCard.css'

const TicketCard = () => {
  return (
    <div className='ticketContainer'>
        <div className='leftPart'>
            <div className='eventTitleContainer'>
                <h1 className='eventTitle op1'>Event Title</h1>
                <h1 className='eventTitle op2'>Event Title</h1>
                <h1 className='eventTitle op3'>Event Title</h1>
                <h1 className='eventTitle op4'>Event Title</h1>
            </div>
            <div className='timeLocationContainer'>
                <h1 className='location'>Casablanca</h1>
                <h1 className='time'>10/10/2024</h1>
            </div>
        </div>
        <div className='rightPart'>
            <div className='eventPriceContainer'>
                <h1 className='ticketType'>Normal</h1>
                <h1 className='ticketPrice'>20$</h1>
            </div>
        </div>
    </div>
  )
}

export default TicketCard