import { configureStore } from "@reduxjs/toolkit";
//Reducers
import appReducer from "redux/slices/App";
import peopleReducer from "redux/slices/Players";
import zonesReducer from "redux/slices/Zones";

const store = configureStore({
  reducer: {
    app: appReducer,
    people: peopleReducer,
    zones: zonesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
