import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducers";

const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
