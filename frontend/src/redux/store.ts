import {configureStore} from "@reduxjs/toolkit";
import {configuratorSlice} from "./configuratorSlice";

export const store = configureStore({
  reducer: {
    configurator: configuratorSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
