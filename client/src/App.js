import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store';

// Actions
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearAccount } from './actions/accountActions';

// Components
import PrivateRoute from './components/shared/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Homebase from './components/homebase/Homebase';
import NewAccount from './components/account/NewAccount';
import EditAccount from './components/account/EditAccount';
import NewCharacter from './components/characters/NewCharacter';
import Character from './components/characters/Character';
import Play from './components/play/Play';
import NotFound from './components/not-found/NotFound';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearAccount());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route render={() => (
                <div>
                  <Navbar />
                  <div className='container'>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Switch>
                      <PrivateRoute exact path='/home' component={Homebase} />
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path='/newuser' component={NewAccount} />
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path='/account' component={EditAccount} />
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path='/character' component={NewCharacter} />
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path='/character/:id' component={Character} />
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path='/play' component={Play} />
                    </Switch>
                    <Route exact path='/not-found' component={NotFound} />
                  </div>
                  <Footer />
                </div>
              )} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
