import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className='container'>
        <Switch>
          <Redirect path='/' exact to='/login' />

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
