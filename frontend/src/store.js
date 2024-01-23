import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";


import cartsliceReducer from './slices/cartSlice'
import authSliceReducer from './slices/authSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart: cartsliceReducer,
        auth: authSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;