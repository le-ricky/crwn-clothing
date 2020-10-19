import React from 'react';
import CartIcon from '../cart-icon/cart-icon.component';
import CustomButtom from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items' />
        {
            cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
            ))
        }
        <CustomButtom>GO TO CHECKOUT</CustomButtom>
    </div>
);

const mapStateToProps = ({ cart: { cartItems }}) => ({
    cartItems
})

export default connect(mapStateToProps)(CartDropdown);