import {configureStore} from "@reduxjs/toolkit";
import { contactReduser } from "../contact/contactSlice";

export const contact = configureStore({
  reducer: {
    contact: contactReduser,
  }
});

export type RootState = ReturnType<typeof contact.getState>;
export type AppDispatch = typeof contact.dispatch;