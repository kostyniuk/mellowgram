import React, { useEffect, useCallback } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import useFetch from './hooks/useFetch';

import useAuth from './hooks/useAuth';

import Login from './pages/Login';
import Header from './components/Header/Header';
import Signup from './pages/Signup';
import User from './pages/User';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import About from './pages/About';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedInFollowing } from './redux/actions';
import Direct from './pages/Direct';

const App = () => {
  const dispatch = useDispatch();
  const { request } = useFetch();

  const userInfo = useSelector(
    (state) => state.loggedInUser,
    (prev, curr) => {
      return prev.id === curr.id;
    }
  );

  const fetchFollowing = useCallback(
    async (info, signal) => {
      if (userInfo.id) {
        const responce = await request(
          `/api/follow/following/${userInfo.username}`,
          {},
          signal
        );
        if (responce.success) {
          dispatch(
            setLoggedInFollowing({
              users: responce.data,
              user: userInfo.username,
            })
          );
          // dispatch(setFollowing({ users: responce.data, user: info.username }));
        }
      }
    },
    [request, userInfo.id]
  );

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing]);

  const { loading } = useAuth();
  if (loading) return <div></div>;

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
              render={(props) => <Settings {...props} />}
            />
            <Route
              exact
              path='/about'
              render={(props) => <About {...props} />}
            />
            <Route
              exact
              path='/direct'
              render={(props) => <Direct {...props} />}
            />
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
              path='/about'
              render={(props) => <About {...props} />}
            />
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
  }
};

export default App;
