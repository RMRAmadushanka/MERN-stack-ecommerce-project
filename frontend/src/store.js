import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlices";

import cartsliceReducer from './slices/cartSlice'
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart: cartsliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;