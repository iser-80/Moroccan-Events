import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('organizationInfo')

const OrganizationSlice = createSlice({
    name: 'authOrganization',
    initialState,
    reducers: {
        setOrganizationCreadentials: (state, action) => {
            state.organizationInfo = action.payload
            localStorage.setItem('organizationInfo', JSON.stringify(action.payload))
        },
        organizationLogout: (state, action) => {
            state.organizationInfo = null
            localStorage.removeItem('organizationInfo')
        }
    }
})

const { setOrganizationCreadentials, organizationLogout } = OrganizationSlice.actions
export default OrganizationSlice.reducer