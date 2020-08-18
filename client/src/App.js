import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {
  setLoggedInFollowing,
  getChats,
  getMessages,
  setUuid,
  addMessage,
  resetUnreadCounter,
  setOnline,
  addChat,
} from './redux/actions';

import useFetch from './hooks/useFetch';
import useAuth from './hooks/useAuth';

import Login from './pages/Login';
import Header from './components/Header/Header';
import Signup from './pages/Signup';
import User from './pages/User';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import About from './pages/About';
import Direct from './pages/Direct';

import './App.css';
//TODO WHEN I RECEIVE A MESSAGE AND I'M INSIDE THIS CHAT, IT SHOULDN'T BE TREATED AS UNREAD

const ws = new WebSocket(`wss://mellowgram.herokuapp.com/`);
// const ws = new WebSocket(`ws://localhost:5000`);

const App = () => {
  const dispatch = useDispatch();

  const { request } = useFetch();
  const { loading } = useAuth();

  const [textInput, setTextInput] = useState('');
  const [openDialog, setOpenDialog] = useState(null);

  const userInfo = useSelector((state) => state.loggedInUser);
  const chats = Object.values(useSelector((state) => state.chats));

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleMessageSend = (roomId, senderId) => {
    if (textInput) {
      ws.send(
        JSON.stringify({
          action: 'SEND_MESSAGE',
          roomId,
          senderId,
          context: textInput,
          uuid: userInfo.uuid,
        })
      );
      dispatch(
        addMessage({
          info: {
            messageId: '//Do not know yet',
            roomId,
            senderId,
            context: textInput,
            date: 'now',
          },
          me: userInfo,
        })
      );
    }
    setTextInput('');
  };

  const handleChatClick = (chat_id) => {
    const room = chats.filter((chat) => chat.room_id === chat_id)[0];
    setTextInput('');
    setOpenDialog(chat_id);

    if (room.unread) {
      dispatch(resetUnreadCounter({ chatId: chat_id }));

      ws.send(
        JSON.stringify({
          action: 'SET_READ',
          chatId: chat_id,
          userId: userInfo.id,
        })
      );
    }
  };

  const startMessagingHandler = ({ me, other }) => {
    ws.send(JSON.stringify({ action: 'START_CHAT', me, other }));
  };

  const fetchFollowing = useCallback(
    async (info, signal) => {
      if (info.id) {
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
        }
      }
    },
    [request, userInfo.id]
  );

  useEffect(() => {
    // ws.onopen = () => {
    //   console.log('Connection established');
    // };
    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      console.log({ message });
      const { action } = message;
      switch (action) {
        case 'INFORMATION_IS_READY':
          ws.send(JSON.stringify({ action: 'GET_CHATS', id: userInfo.id }));
          ws.send(
            JSON.stringify({ action: 'GET_ONLINE', user_id: userInfo.id })
          );
          break;

        case 'GET_CHATS':
          dispatch(
            getChats({
              chats: message.payload.rooms,
              messages: message.payload.messages,
              me: message.payload.id,
            })
          );
          dispatch(
            getMessages({
              messages: message.payload.messages,
              chats: message.payload.rooms,
            })
          );
          dispatch(setUuid({ uuid: message.payload.uuid }));
          break;

        case 'GET_ONLINE':
          dispatch(setOnline({ onlineIds: message.payload }));
          break;

        case 'SEND_MESSAGE':
          const { messageInfo } = message;
          dispatch(addMessage({ info: messageInfo, me: userInfo }));
          break;

        case 'START_CHAT': {
          const { chat } = message;
          dispatch(addChat({ chat }));
          setOpenDialog(chat.room_id);
          break;
        }

        default:
          break;
      }
    };

    ws.onclose = () => {
      console.log('Connection closed');
    };
  }, []);

  useEffect(() => {
    fetchFollowing(userInfo);
  }, [fetchFollowing]);

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
              render={(props) => (
                <Direct
                  {...props}
                  dialog={openDialog}
                  textInput={textInput}
                  openDialog={openDialog}
                  handleChatClick={handleChatClick}
                  handleChange={handleChange}
                  handleMessageSend={handleMessageSend}
                  setOpenDialog={setOpenDialog}
                />
              )}
            />
            <Route
              exact
              path='/:username'
              render={(props) => (
                <User
                  {...props}
                  startMessagingHandler={startMessagingHandler}
                  setOpenDialog={setOpenDialog}
                />
              )}
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
