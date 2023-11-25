import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const organizationLoginAsync = createAsyncThunk('organization/login', async (data) => {
    const response = await fetch('http://localhost:5000/api/organization/login', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await response.json()
    return result 
})

export const organizationRegisterAsync = createAsyncThunk('organization/register', async (data) => {
    const response = await fetch('http://localhost:5000/api/organization/register', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await response.json()
    return result
})

export const organizationLogoutAsync = createAsyncThunk('organization/logout', async () => {
    const response = await fetch('http://localhost:5000/api/organization/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    return result 
})

export const organizationGetEventsAsync = createAsyncThunk('organization/getEvents', async (eventId) => {
    const response = await fetch(`http://localhost:5000/api/organization/getEvents/${eventId}`, {
        method: 'GET',          
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await response.json()
    return result
})

const organizationApiSlice = createSlice({
    name: 'authOrganizationApi',
    initialState: {
        organization: []
    },
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(organizationLoginAsync.fulfilled, (state, action) => {
                state.organization = action.payload
            })
            .addCase(organizationRegisterAsync.fulfilled, (state, action) => {
                state.organization = null
            })
            .addCase(organizationGetEventsAsync.fulfilled, (state, action) => {
                state.organization = action.payload.organization;
            })
            .addCase(organizationGetEventsAsync.rejected, (state, action) => {
                // Handle the error, log it, or update the state accordingly
                console.error('Error fetching organization events:', action.error);
            })
    }
})

export default organizationApiSlice.reducer