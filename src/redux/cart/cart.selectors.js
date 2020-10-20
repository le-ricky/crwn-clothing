import { createSelector } from 'reselect';

//Input Selector: takes the whole state and returns a slice of it. This is case, returns cartItems
const selectCart = state => state.cart;

//Output Selector
export const selectCartItems = createSelector(
    //Takes Input Selectors as a param
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartTotal = createSelector(
    [selectCartItems],
        //accumlates the count total for the quantity value for all properties. This is called a Selector; where we go through the state to pull out a new value
        cartItems => cartItems.reduce(
            (totalPrice, cartItems) => totalPrice + (cartItems.quantity * cartItems.price) , 0 //method goes through each quantity value and add to the accumaltedQuantity
        )
)

export const selectCartItemCount = createSelector(
    [selectCartItems],
        //accumlates the count total for the quantity value for all properties. This is called a Selector; where we go through the state to pull out a new value
        cartItems => cartItems.reduce(
            (accumalatedQuantity, cartItems) => accumalatedQuantity + cartItems.quantity, 0 //method goes through each quantity value and add to the accumaltedQuantity
        )
)