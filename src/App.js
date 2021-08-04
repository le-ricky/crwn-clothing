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

import { auth, createUserProfileDocument, addCollectionsAndDocuments } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';



class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser,  collectionsArray } = this.props;

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
      } 
        setCurrentUser(userAuth);

        //USED TO ADD SHOP DATA TO FIREBASE
        // addCollectionsAndDocuments(
        //   'collections', 
        //   collectionsArray.map(({ title, items }) => (
        //     { title, items })));
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
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path='/signin' render={() => 
            this.props.currentUser ? (<Redirect path='/' />) : (<SignInSignUp />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
