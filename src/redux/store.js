import { configureStore, createSlice } from '@reduxjs/toolkit'
import naverStoreReducer from './naverStore'
// let user =createSlice({
//     name: "state 이름",
//     initialState: "값"
// }) 

export default configureStore({
  reducer: { 
    naverStore: naverStoreReducer
  }
})  