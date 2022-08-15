import { createSlice } from '@reduxjs/toolkit';

export const naverStoreSlice = createSlice({
    name: "naverStore",
    initialState: { value: {}},
    reducers: {
        setNaverStore: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setNaverStore } = naverStoreSlice.actions;
export default naverStoreSlice.reducer;
