import React from 'react';
import './header-styles.scss';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';



const Header = ({ currentUser, hidden }) => (
    <HeaderContainer className='header'>
        <LogoContainer className='logo-container' to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer className='options'>
            <OptionLink className='option' to='/shop'>SHOP</OptionLink>
            <OptionLink className='option' to='/shop'>CONTACT</OptionLink>
            {
                currentUser ?
                <OptionLink as="div" className="option" onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                :
                <OptionLink className="option" to="/signin">SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
     currentUser: selectCurrentUser,
     hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
