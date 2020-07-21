import React from 'react';
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
import { useSelector } from 'react-redux';

const App = () => {
  const userInfo = useSelector((state) => state.loggedInUser);

  const { loading } = useAuth();
  if (loading) return <div></div>;

  console.log({ userInfo });

  if (userInfo.isAuthenticated) {
    return (
      <Router>
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/header'
              render={(props) => <Header {...props} />}
            />
            <Redirect from='/' exact to={`/${userInfo.username}`} />
            <Redirect from='/login' exact to={`/${userInfo.username}`} />
            <Redirect from='/signup' exact to={`/${userInfo.username}`} />
            <Route
              exact
              path='/account'
              render={(props) => <Settings {...props} authorized={userInfo} />}
            />
            <Route
              exact
              path='/about'
              render={(props) => <About {...props} authorized={userInfo} />}
            />
            <Route
              exact
              path='/:username'
              render={(props) => <User {...props} authorized={userInfo} />}
            />

            <Route
              render={(props) => <NotFound {...props} authorized={userInfo} />}
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
              render={(props) => <About {...props} authorized={userInfo} />}
            />
            <Route
              exact
              path='/:username'
              render={(props) => <User {...props} authorized={userInfo} />}
            />
            <Route
              render={(props) => <NotFound {...props} authorized={userInfo} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
