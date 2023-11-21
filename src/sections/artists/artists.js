import React, { useEffect, useState } from 'react'
import './artists.css'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { getArtistsAsync } from '../../redux_toolkit/slices/api/artistApiSlice'

const Artists = () => {
  const [artists, setArtists] = useState([])
  const [slide, setSlide] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await dispatch(getArtistsAsync())
      console.log(response.payload)
      setArtists(response.payload)
    }

    fetchArtists()
  }, [dispatch])
  
  function nextSlide () {
    setSlide(slide === artists.length - 1 ? 0 : slide + 1)
  }

  function prevSlide () {
    setSlide(slide === 0 ? artists.length - 1 : slide - 1)
  }

  return (
    <div className='artistsContainer'>
      <div className='artistsWrapper'>
        <div className='artistsContentHeader'>
          <p>Top Artists This Month</p>
        </div>
        <div className='artistsContent'>
          <div className='artistsContentBackground'>
            <FaArrowLeft onClick={prevSlide} className='arrow leftArrow'/>
            
            <div className='artistInfos'>
              <h1 className='artistFirstName'>{artists.length > 0 ? artists[slide]?.first_name : 'artist firstName'}</h1>
              <h1 className='artistLastName'>{artists.length > 0 ? artists[slide].last_name : 'artist LastName' }</h1>
              <h2 className='artistGenre' >{artists.length > 0 ? artists[slide]?.genre : 'artist genre'}</h2>
            </div>

            <FaArrowRight onClick={nextSlide} className='arrow rightArrow'/>

            <div className='indicators'>
              {artists.map((item, index) => {
                return (
                  <button onClick={() => setSlide(index)} className={slide === index ? 'indicator' : 'indicator inactive-indicator' }></button>
                )
              })}
            </div>
          </div>
                  
        </div>
      </div>
    </div>
  )
}

export default Artists