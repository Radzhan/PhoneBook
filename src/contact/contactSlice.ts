import {createSlice} from "@reduxjs/toolkit";
import { Contact } from "../types";

interface ContactState {
    contacts: Contact[];
  }
  
  const initialState: ContactState = {
    contacts: [],
  };
  

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
});

export const contactReduser = contactSlice.reducer;