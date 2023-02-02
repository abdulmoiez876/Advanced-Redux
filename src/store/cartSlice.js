import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        cartTotal: 0
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(id => id === newItem.id);
            state.cartTotal ++;

            if(!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    totalPrice: newItem.price,
                    quantity: 1
                });
            }
            else {
                existingItem.quantity ++;
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const idToRemove = action.payload;

            const itemToRemove = state.cartItems.find(id => id === idToRemove);
            state.cartTotal --;

            if(itemToRemove.quantity === 1) {
                state.cartItems = state.cartItems.filter(id => id !== idToRemove)
            }
            else {
                itemToRemove.quantity --;
                itemToRemove.totalPrice = itemToRemove.totalPrice - itemToRemove.price;
            }
        },
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;