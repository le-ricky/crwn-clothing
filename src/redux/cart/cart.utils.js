
//FUNCTION TO ADD ITEMS INTO CART. TAKES THE EXISTING CART AND ITEM TO ADD
export const addItemToCart = (cartItems, cartItemToAdd) => {

    //CHECK IF ITEM ALREADY EXIST BASED ON ID
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    //IF ITEM EXIST, ADD 1 TO QUANTITY BY MATCHING ITEM ID
    if(existingCartItem) {
        return cartItems.map(
            cartItem => cartItem.id === cartItemToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} 
            : cartItem
        )
    }

    //IF IT DOES NOT ALREADY EXIST. RETURN ARRAY WITH NEW ITEM AND SET  QUANITY TO 1
    return [...cartItems, {...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);
    
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(
        cartItem => cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1} 
        : cartItem
    )

    
};