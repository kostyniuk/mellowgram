import React, { useEffect, useState, useCallback } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import useAuth from './hooks/useAuth';

import Login from './pages/Login';
import Header from './components/Header/Header';
import Signup from './pages/Signup';
import User from './pages/User';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import About from './pages/About';

const App = () => {
  const { info, loading } = useAuth();
  if (loading) return <div></div>;

  console.log({ info });

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
              path='/account'
              render={(props) => <Settings {...props} authorized={info} />}
            />
            <Route
              exact
              path='/about'
              render={(props) => <About {...props} authorized={info} />}
            />
            <Route
              exact
              path='/:username'
              render={(props) => <User {...props} authorized={info} />}
            />

            <Route
              render={(props) => <NotFound {...props} authorized={info} />}
            />
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
              path='/about'
              render={(props) => <About {...props} authorized={info} />}
            />
            <Route
              exact
              path='/:username'
              render={(props) => <User {...props} authorized={info} />}
            />
            <Route
              render={(props) => <NotFound {...props} authorized={info} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
