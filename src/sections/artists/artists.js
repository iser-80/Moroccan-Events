import React, { useState } from 'react'
import './artists.css'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

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
          <FaArrowLeft onClick={prevSlide} className='arrow leftArrow'/>

          {data.map((item, index) => {
            return (
              <img src={item.src} alt={item.alt} key={index} className={slide === index ? 'slide' : 'slide slide-hidden'}/>
            )
          })}

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
  )
}

export default Artists