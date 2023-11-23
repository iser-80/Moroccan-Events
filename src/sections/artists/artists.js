import React, { useEffect, useState } from 'react'
import styles from './artists.module.css'
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
    <div className={styles.artistsSectionContainer}>
      <div className={styles.artistsSectionWrapper}>
        <div className={styles.artistsSectionContentHeader}>
          <p>Top Artists This Month</p>
        </div>
        <div className={styles.artistsSectionContent}>
          <div className={styles.artistsSectionContentBackground}>
            <FaArrowLeft onClick={prevSlide} className={`${styles.artistsSectionarrow} ${styles.artistsSectionleftArrow}`}/>
            
            <div className={styles.artistsSectionartistInfos}>
              <h1 className={styles.artistsSectionartistFirstName}>{artists.length > 0 ? artists[slide]?.first_name : `${styles.artistsSectionartist} ${styles.artistsSectionfirstName}`}</h1>
              <h1 className={styles.artistsSectionartistLastName}>{artists.length > 0 ? artists[slide].last_name : `${styles.artistsSectionartist} ${styles.artistsSectionLastName}` }</h1>
              <h2 className={styles.artistsSectionartistGenre} >{artists.length > 0 ? artists[slide]?.genre : `${styles.artistsSectionartist} ${styles.artistsSectiongenre}`}</h2>
            </div>

            <FaArrowRight onClick={nextSlide} className={`${styles.artistsSectionarrow} ${styles.artistsSectionrightArrow}`}/>

            <div className={styles.artistsSectionindicators}>
              {artists.map((item, index) => {
                return (
                  <button onClick={() => setSlide(index)} className={slide === index ? styles.artistsSectionindicator : `${styles.artistsSectionindicator} ${styles['artistsSectioninactive-indicator']}` }></button>
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