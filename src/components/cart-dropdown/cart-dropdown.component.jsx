import React from 'react';
import CartIcon from '../cart-icon/cart-icon.component';
import CustomButtom from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items' >
        {
            cartItems.length ?
            (cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
            ))
            ) : (
                <span className='empty-message'>Your Cart is empty</span>
            )}
        </div>
        <CustomButtom onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }} >GO TO CHECKOUT</CustomButtom>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));