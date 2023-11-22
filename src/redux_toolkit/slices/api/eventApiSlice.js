import Stripe from "stripe";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getTheEventAsync = createAsyncThunk('event/getEvent', async (eventId) => {
    const response = await fetch(`http://localhost:5000/api/event/${eventId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await response.json()
    return result
})

export const getEventArtistsAsync = createAsyncThunk('event/getArtists', async (eventId) => {
    const response = await fetch(`http://localhost:5000/api/event/getArtists/${eventId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await response.json()
    return result
})

export const getMainEventsAsync = createAsyncThunk('events/getMainEvents', async () => {
    const response = await fetch('http://localhost:5000/api/events/getMainEvents', {
        method: 'GET',          
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await response.json()
    return result
})

export const getUpComingEventsAsync = createAsyncThunk('events/getUpComingEvents', async () => {
    const response = await fetch('http://localhost:5000/api/events/getUpComingEvents', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })
    
    const result = await response.json()
    return result
})

export const organizationAddEventAsync = createAsyncThunk('event/addEvent', async (data) => {
    const response = await fetch('http://localhost:5000/api/organization/addEvent', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await response.json()
    return result
})

export const organizationDeleteEventAsync = createAsyncThunk('event/deleteEvent', async (eventId) => {
    const response = await fetch('http://localhost:5000/api/organization/deleteEvent', {
        method: 'DELETE',
        body: JSON.stringify({eventId}),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })
    const result = response.json()
    return result
})


// this for chosing the artists in the event

export const eventAddArtistAsync = createAsyncThunk('event/addArtist', async (data) => {
    const response = await fetch('http://localhost:5000/api/event/addArtist', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })
    const result = response.json()
    return result
})

export const eventDeleteArtistAsync = createAsyncThunk('event/deleteArtist', async ({eventId, artistId}) => {
    const response = await fetch('http://localhost:5000/api/event/deleteArtist', {
        method: 'DELETE',
        body: JSON.stringify({eventId, artistId}),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })
    const result = response.json()
    return result
})

export const buyEventTicketAsync = createAsyncThunk('event/buyTicket', async () => {
    try {
        const response = await fetch('http://localhost:5000/create-checkout-session', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to initiate checkout session');
        }

        const { sessionId } = await response.json();
        console.log('session Id : ', sessionId)

        // Redirect the user to the Stripe Checkout page using the session ID
        const stripe = Stripe('pk_test_51OFDmEBMTJml9ldYgcSSEEuLhSZaV09YVbOPAzBZdeU7VU9yyKPnPAnZlR1qP44gvd0A6vSmZxjDAD3lO0VzREQu00tF7mpnrG');
        const redirect = await stripe.redirectToCheckout({ sessionId });  

        if (redirect) {
            console.log(redirect)
        }
    } catch (error) {
        console.error('Error during checkout:', error.message);
        // Handle the error (e.g., dispatch an action or show an error message)
    }
});


const eventSlice = createSlice({
    name: 'event',
    initialState: {
        events: []
    },
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(organizationAddEventAsync.fulfilled, (state, action) => {
                state.events.push(action.payload)
            })
            .addCase(organizationDeleteEventAsync.fulfilled, (state, action) => {
                const eventId = action.payload.eventId
                state.events = state.events.filter((event) => event._id !== eventId)
            })
    }
})


export default eventSlice.reducer