import { TOGGLE_CART_HIDDEN } from "./cart.types"
import CartActionTypes from './cart.types';


export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
})