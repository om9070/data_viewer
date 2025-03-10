import { configureStore } from "@reduxjs/toolkit";
import ChartReducer from "./reducer";

const store = configureStore({
  reducer: ChartReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;