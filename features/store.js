import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import scudReducer from "./scudSlice";
import editReducer from "./editSlice";
import bookRideReducer from "./bookRideSlice";

export const store = configureStore({
  reducer: {
    scud: scudReducer,
    auth: authReducer,
    edit: editReducer,
    bookride: bookRideReducer
  }
});
