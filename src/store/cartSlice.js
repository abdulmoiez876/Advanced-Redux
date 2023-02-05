import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        cartTotal: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.cartItems = action.payload.cartItems;
            state.cartTotal = action.payload.cartTotal;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(cartItem => cartItem.id === newItem.id);
            state.cartTotal ++;
            state.changed = true;

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
            state.changed = true;

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
            state.changed = true;
            const incrementProduct = state.cartItems.find(cartItem => cartItem.id === incrementId);

            incrementProduct.quantity ++;
            incrementProduct.totalPrice += incrementProduct.price;
        },
        decrementProduct(state, action) {
            const decrementId = action.payload;

            state.cartTotal --;
            state.changed = true;
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

const cartActions = cartSlice.actions;

const sendCartData = (cartData) => {
    console.log('sending');
    return async () => {
        try {
            fetch('https://advanced-redux-50bfc-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cartData)
            }).then((response) => {
                console.log('Success');
            }).catch((error) => {
                console.log('try again');
            })
        }
        catch(err) {
            console.log(err);
        }
    }
}

const fetchCartData = () => {
    console.log('fetching data...');
    return async (dispatch) => {
        try {
            fetch('https://advanced-redux-50bfc-default-rtdb.firebaseio.com/cart.json')
            .then(async (response) => {
                const data = await response.json();
                console.log('fetched successfully');
                dispatch(cartActions.replaceCart({
                    cartItems: data.cartItems || [],
                    cartTotal: data.cartTotal || 0,
                    changed: data.changed || false
                }));
            })
            .catch((err) => {
                console.log('error fetching');
            })
        }
        catch(err) {
            console.log(err);
        }
    }
}

export {
    cartActions,
    sendCartData,
    fetchCartData
}
export default cartSlice;