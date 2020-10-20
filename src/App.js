import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.componenet';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';



class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    //LISTENS TO DATABASE FOR CHANGES
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      //BELOW IS HOW WE STORE USER DATA FROM THE DATEBASE TO THE APP STATE
      //CHECKS IF AUTH OBJECT EXISTS; HAPPENS IF USER SIGNS IN
      if (userAuth) {
        //SETS THE REFERENCE TO DATABASE WHERE USERS ARE STORED
        const userRef = await createUserProfileDocument(userAuth);
        
        //USES onSnapShot METHOD TO CALL SNAPSHOT OBJECT
        userRef.onSnapshot(snapShot => {

          //SETS THE STATE TO THE USER DATA FROM DATABASE
          setCurrentUser({
              id: snapShot.id,

              //SnapShot OBJECT DOESN'T HOLD ANY USER DATA. USE DATA() METHOD TO RETRIEVE DATA AND SET STATE 
              ...snapShot.data()
            });
          });
      } else {
        //IF userAUTH is NULL, MEANING NO ONE IS SIGNED IN. WE STILL WANT STATE TO BE NULL. ELSE HAPPENS IF !userAuth
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => 
            this.props.currentUser ? (<Redirect path='/' />) : (<SignInSignUp />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
