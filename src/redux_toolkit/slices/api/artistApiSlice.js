import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getArtistsAsync = createAsyncThunk('artists/getArtists', async () => {
    const response = await fetch('http://localhost:5000/api/artists', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    return result
})


const artistApiSlice = createSlice({
    name: 'artistApi',
    initialState: {artists: []},
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(getArtistsAsync.fulfilled, (state, action) => {
                state.artists = action.payload
            })
    }
})

export default artistApiSlice.reducer