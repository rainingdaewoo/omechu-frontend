import { createSlice } from '@reduxjs/toolkit';

export const naverStoreSlice = createSlice({
    name: "naverStore",
    initialState: { value: {}},
    reducers: {
        setNaverStore: (state, action) => {
            state.value = action.payload
        },
        // setLikeStore:(state, action) => {
        //     const findIndex = this.state.objArray.findIndex(element => element.storeId === action.payload);
        //     let   copyArray = [...this.state.objArray];
        //     if(findIndex !== -1) {
        //         copyArray[findIndex] = {...copyArray[findIndex], name: "Update"};
        //       }
        // },
    },
});

export const { setNaverStore, setLikeStore } = naverStoreSlice.actions;
export default naverStoreSlice.reducer;
