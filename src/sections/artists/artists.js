import React, { useEffect, useState } from 'react'
import './artists.css'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { getArtistsAsync } from '../../redux_toolkit/slices/api/artistApiSlice'

const Artists = () => {
  const Slides = {
    'slides' : [
      {
        "src": "https://picsum.photos/seed/img1/600/400",
        "alt": "Image 1 for carousel"
      },
      {
        "src": "https://picsum.photos/seed/img2/1300/650",
        "alt": "Image 2 for carousel"
      },
      {
        "src": "https://picsum.photos/seed/img3/600/400",
        "alt": "Image  for carousel"
      },
    ]
  }

  const data = Slides.slides

  const [artists, setArtists] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await dispatch(getArtistsAsync())
      console.log(response.payload)
      setArtists(response.payload)
    }

    fetchArtists()
  }, [dispatch])

  useEffect(() => {
    console.log(artists)
  }, [artists])

  const [slide, setSlide] = useState(0)

  function nextSlide () {
    setSlide(slide === data.length - 1 ? 0 : slide + 1)
  }

  function prevSlide () {
    setSlide(slide === 0 ? data.length - 1 : slide - 1)
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
              <h1 className='artistFirstName'>Artist FirstName</h1>
              <h1 className='artistLastName'>Artist LastName</h1>
              <h2 className='artistGenre' >Artist Genre</h2>
            </div>

            <FaArrowRight onClick={nextSlide} className='arrow rightArrow'/>

            <div className='indicators'>
              {data.map((item, index) => {
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