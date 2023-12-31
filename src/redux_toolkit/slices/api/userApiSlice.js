import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const userLoginAsync = createAsyncThunk('user/login', async (data) => {
    const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await response.json()
    return result
})

export const userRegisterAsync = createAsyncThunk('user/register', async (data) => {
    const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await response.json()
    return result
})

export const userLogoutAsync = createAsyncThunk('user/logout', async () => {
    const response = await fetch('http://localhost:5000/api/user/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    return result
})


const userApiSlice = createSlice({
    name: 'authUserApi',
    initialState: {
        user: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLoginAsync.fulfilled, (state, action) => {
                state.userInfo = action.payload
            })
    }
})

export default userApiSlice.reducer