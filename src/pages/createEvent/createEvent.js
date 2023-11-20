import React, { useEffect, useState } from 'react';
import './createEvent.css';
import { useDispatch } from 'react-redux';
import { organizationAddEventAsync } from '../../redux_toolkit/slices/api/eventApiSlice';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [artists, setArtists] = useState([]);
    const [options, setOptions] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchArtists = async () => {
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
        };

        fetchArtists();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await dispatch(
            organizationAddEventAsync({ title, description, date, location, artists })
        );
        if (response) {

            console.log(response)

            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');

            navigate(`/event/${response.payload.eventId}`)
        }
    };

    const changeArtists = (selectedArtists) => {
        setArtists(selectedArtists);
    };

    return (
        <div className="createEventContainer">
            <div className="createEventWrapper">
                <h1>create event</h1>
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
                        name="data"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                    <input
                        type="text"
                        name="location"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        placeholder="location"
                    />
                    <Select
                        isMulti
                        options={options}
                        value={artists}
                        onChange={changeArtists}
                    />
                    <button type="submit">add event</button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
