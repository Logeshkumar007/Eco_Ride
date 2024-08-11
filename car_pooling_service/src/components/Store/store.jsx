import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./Reducer";

const store = configureStore({
  reducer: {
    loginReducer: Reducer.Loginslice,
    selectedIdReducer: Reducer.selectedIdslice,
    rideDataReducer: Reducer.rideDataSlice,
  },
});

export default store;