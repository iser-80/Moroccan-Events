import React, { useEffect, useState } from 'react';
import styles from './editEvent.module.css';
import { useDispatch } from 'react-redux';
import { getTheEventAsync, organizationAddEventAsync, updateEventAsync } from '../../redux_toolkit/slices/api/eventApiSlice';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
    const { eventId } = useParams()
    const [data, setData] = useState({})

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [ticket, setTicket] = useState();
    const [artists, setArtists] = useState([]);
    const [eventArtists, setEventArtists] = useState([])
    const [options, setOptions] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await dispatch(getTheEventAsync(eventId));
              if(response && response.payload){
                setData(response.payload)
                setTitle(response.payload.title);
                setDescription(response.payload.description);
                setDate(response.payload.date);
                setLocation(response.payload.location);
                setTicket(response.payload.ticket);
                setArtists(response.payload.artists);
              }
              
            } catch (error) {
              console.error('Error fetching event details:', error);
            }
          };

          const fetchAllArtists = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/artists');
                if (response) {
                    const data = response.data;
                    const artistOptions = data.map((item) => ({
                        value: item._id,
                        label: item.first_name + " " + item.last_name,
                    }));
                    setOptions(artistOptions);
                }
            } catch (error) {
                console.log(error);
            }
          }

        

          fetchData()
          fetchAllArtists()
         
    }, [eventId])

    useEffect(() => {
        const fetchEventArtists = async () => {
            const eventArtists = [];
            try {
                await Promise.all(
                    artists.map(async (artistId) => {
                        const artist = await axios.get(`http://localhost:5000/api/artists/getArtist/${artistId}`);
                        console.log(artist)
                        eventArtists.push(artist.data); 
                    })
                );
                console.log('event artists : ', eventArtists)
                if(eventArtists.length > 0){
                    console.log('ok')
                    const artistOptions = eventArtists.map((artist) => ({
                        value: artist._id,
                        label: artist.first_name + " " + artist.last_name,
                        key: artist._id.toString(), 
                    }));
                    setEventArtists(artistOptions);
                    console.log('event artists : ', eventArtists)
                }
            } catch (error) {
                console.error('Error fetching event artists:', error);
            }
        };

        if (artists.length > 0) {
            fetchEventArtists();
        }
    }, [artists]);

    const changeArtists = (selectedArtists) => {
        setEventArtists(selectedArtists);
    };

    // dispatch the update of the event
    const handleSubmit = async (e) => {
        e.preventDefault()

         const response = await dispatch(updateEventAsync({eventId, title, description, date, location, ticket, eventArtists}))
        if(response){
            console.log('response : ', response)
        }else{
            console.log('response error')
        }

    }

    return (
        <div className={styles.createEventContainer}>
            <div className={styles.createEventWrapper}>
                <h1>Edit event</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder="title"
                    />
                    <textarea
                        type="text"
                        rows={3}
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="description"
                    ></textarea>
                    <input
                        type="date"
                        name="date"
                        onChange={(e) => setDate(e.target.value)}
                        value={date ? new Date(date).toISOString().split('T')[0] : ''}
                    />
                    <input
                        type="text"
                        name="location"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        placeholder="location"
                    />
                    <input
                        type="number"
                        name="Ticket"
                        onChange={(e) => setTicket(e.target.value)}
                        value={ticket}
                        placeholder="ticket price"
                    />
                    <label>Artists : </label>
                    <Select
                        className='select'
                        isMulti
                        options={options}
                        value={eventArtists}
                        onChange={changeArtists}
                    />
                    <button type="submit">edit event</button>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;
