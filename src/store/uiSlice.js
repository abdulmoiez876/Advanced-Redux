import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showCart: false
    },
    reducers: {
        toggleCart(state) {
            state.showCart =!state.showCart;
        }
    }
})

export default uiSlice;
export const uiActions = uiSlice.actions;