import { createSlice } from "@reduxjs/toolkit";

// Load organizationInfo from local storage or set it to null if not found
const storedOrganizationInfoString = localStorage.getItem('organizationInfo');
let storedOrganizationInfo;

try {
  storedOrganizationInfo = JSON.parse(storedOrganizationInfoString);
} catch (error) {
  console.error('Error parsing storedOrganizationInfo:', error);
  storedOrganizationInfo = null;
}

const initialState = {
  organizationInfo: storedOrganizationInfo,
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
