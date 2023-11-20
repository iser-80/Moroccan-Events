// 

import { createSlice } from "@reduxjs/toolkit";

// Load organizationInfo from local storage or set it to null if not found
const storedOrganizationInfo = JSON.parse(localStorage.getItem('organizationInfo'));
const initialState = {
  organizationInfo: storedOrganizationInfo || null,
};

const OrganizationSlice = createSlice({
  name: 'organizationInfo',
  initialState,
  reducers: {
    setOrganizationCredentials: (state, action) => {
      state.organizationInfo = action.payload;
      localStorage.setItem('organizationInfo', JSON.stringify(action.payload));
    },
    organizationLogout: (state, action) => {
      state.organizationInfo = null;
      localStorage.removeItem('organizationInfo');
    },
  },
});

export const { setOrganizationCredentials, organizationLogout } = OrganizationSlice.actions;
export default OrganizationSlice.reducer;
