import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  state = {
    currentUser: null
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //LISTENS TO DATABASE FOR CHANGES
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      //CHECKS IF AUTH OBJECT EXISTS; HAPPENS IF USER SIGNS IN
      if (userAuth) {
        //SETS THE REFERENCE TO DATABASE WHERE USERS ARE STORED
        const userRef = await createUserProfileDocument(userAuth);
        
        //USES onSnapShot METHOD TO CALL SNAPSHOT OBJECT
        userRef.onSnapshot(snapShot => {

          //SETS THE STATE TO THE USER DATA FROM DATABASE
          this.setState({
            currentUser: {
              id: snapShot.id,

              //SnapShot OBJECT DOESN"T HOLD ANY USER DATA. USE DATA() METHOD TO RETRIEVE DATA AND SET STATE 
              ...snapShot.data()
            }
          });
          console.log(this.state);
        })

      } else {
        this.setState({ currentUser: userAuth });
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop/' component={ShopPage} />
          <Route exact path='/signin' component={SignInSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
