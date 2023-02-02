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
            const existingItem = state.cartItems.find(cartItem => cartItem.id === newItem.id);
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
        incrementProduct(state, action) {
            const incrementId = action.payload;

            state.cartTotal ++;
            const incrementProduct = state.cartItems.find(cartItem => cartItem.id === incrementId);

            incrementProduct.quantity ++;
            incrementProduct.totalPrice += incrementProduct.price;
        },
        decrementProduct(state, action) {
            const decrementId = action.payload;

            state.cartTotal --;
            const decrementProduct = state.cartItems.find(cartItem => cartItem.id === decrementId);

            if(decrementProduct.quantity === 1) {
                state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== decrementId)
            }
            else {
                decrementProduct.quantity --;
                decrementProduct.totalPrice -= decrementProduct.price;
            }
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;