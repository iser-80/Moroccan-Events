import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../slices/userSlice";
import organizationSliceReducer from "../slices/organizationSlice"

const Store = configureStore({
    reducer: {
        authUser: userSliceReducer,
        authOrganization: organizationSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

export default Store