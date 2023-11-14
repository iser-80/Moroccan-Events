import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') || null
};


const UserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setUserCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        userLogout: (state, action) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        }
    }
})

export const { setUserCredentials, userLogout } = UserSlice.actions
export default UserSlice.reducer