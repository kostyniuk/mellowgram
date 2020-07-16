import React, { useEffect, useState, useCallback } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from 'react-router-dom';

import useAuth from './hooks/useAuth';

import Login from './pages/Login';
import Header from './components/Header';
import Signup from './pages/Signup';
import User from './pages/User';
import NotFound from './pages/NotFound';

const App = () => {
  const { info, loading } = useAuth();
  console.log({ info, loading });

  if (loading) return <div></div>;

  if (info.isAuthenticated) {
    return (
      <Router>
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/header'
              render={(props) => <Header {...props} />}
            />
            <Redirect from='/' exact to={`/${info.username}`} />
            <Redirect from='/login' exact to={`/${info.username}`} />
            <Redirect from='/signup' exact to={`/${info.username}`} />
            <Route
              exact
              path='/:username'
              render={(props) => <User {...props} />}
            />
            <Route render={(props) => <NotFound {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className='container'>
          <Switch>
            <Redirect path='/' exact to='/login' />
            <Route
              exact
              path='/signup'
              render={(props) => <Signup {...props} />}
            />
            <Route
              exact
              path='/header'
              render={(props) => <Header {...props} />}
            />

            <Route
              exact
              path='/login'
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path='/:username'
              render={(props) => <User {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
