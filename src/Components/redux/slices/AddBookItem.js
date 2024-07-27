import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'book',
  initialState: [],
  reducers: {
    addBook: (state, action) => {
        state.push(action.payload);
    },
    resetBooks: (state) => {
      return [];
    },
  },
});

export const getBooksList = (state) => state.book;

export const { addBook, resetBooks } = bookSlice.actions;

export default bookSlice.reducer;
