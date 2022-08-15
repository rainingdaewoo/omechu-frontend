import { configureStore, createSlice } from '@reduxjs/toolkit'
import naverStoreReducer from './naverStore'

export default configureStore({
  reducer: { 
    naverStore: naverStoreReducer
  }
})  