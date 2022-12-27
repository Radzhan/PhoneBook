import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/contact";
import axiosApi from "../axiosApi";
import { ApiContactResponse, ContactResponse } from "../types";
interface ContactState {
    contacts: ContactResponse[];
    contact: ContactResponse;
    display: string;
    onDelete: boolean;
}

const initialState: ContactState = {
    contacts: [],
    contact: {
        id: '',
        name: '',
        phone: '',
        email: '',
        image: '',
    },
    display: 'none',
    onDelete: false,
};

interface forObject {
    id: string;
    item: ApiContactResponse;

}

export const createContact = createAsyncThunk<void, ApiContactResponse>('contact/create', async (arg) => {
    await axiosApi.post('/contacts.json', arg);
});

export const getContact = createAsyncThunk('contact/get', async () => {
    const response = await axiosApi.get('/contacts.json');
    return response.data ?? [];
});

export const deleteContact = createAsyncThunk<void, string>('contact/delete', async (id) => {
    await axiosApi.delete('/contacts/' + id + '.json');
});

export const changingContact = createAsyncThunk<void, forObject>('contact/change', async (object) => {
    await axiosApi.put('/contacts/' + object.id + '.json', object.item)
})

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        changeClass: (state) => {
            if (state.display === 'none') {
                state.display = 'block'
            } else {
                state.display = 'none'
            }
        },
        changeContact: (state, action) => {
            state.contact = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getContact.fulfilled, (state, action) => {
            state.contacts = []
            Object.keys(action.payload).map(id => {
                const order = action.payload[id];
                state.contacts.push({
                    ...order,
                    id: id,
                })
            })
        })
        builder.addCase(changingContact.fulfilled, (state) => {
            state.display = 'none'
        })
        builder.addCase(deleteContact.pending, (state) => {
            state.onDelete = true
        })
        builder.addCase(deleteContact.fulfilled, (state) => {
            state.onDelete = false;
        })
        builder.addCase(deleteContact.rejected, (state) => {
            state.onDelete = false
        })
        builder.addCase(createContact.pending, (state) => {
            state.onDelete = true
        })
        builder.addCase(createContact.fulfilled, (state) => {
            state.onDelete = false;
        })
        builder.addCase(createContact.rejected, (state) => {
            state.onDelete = false
        })
    }
});

export const contactReduser = contactSlice.reducer;
export const { changeClass, changeContact } = contactSlice.actions;
export const allContacts = (state: RootState) => state.contact.contacts;