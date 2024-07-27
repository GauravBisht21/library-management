import { configureStore } from '@reduxjs/toolkit';
import AddBookItem from './slices/AddBookItem';

const store = configureStore({
  reducer: {
    book: AddBookItem,
  },
  devTools: true,
});

export default store;
