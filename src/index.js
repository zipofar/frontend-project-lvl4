// @ts-check
/* eslint react/jsx-filename-extension:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { configureStore } from '@reduxjs/toolkit';

import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';

import '../assets/application.scss';
import App from './App';
import rootReducer from '../store';
import {
  initMessages,
  addMsgSuccess,
} from '../store/messages';
import {
  initChannels,
  setActiveChannelId,
  addChannelSuccess,
  updateChannelSuccess,
  removeChannelSuccess,
} from '../store/channels';
import {
  unsetAppError,
  setAppError,
  setConnectionState,
  enumConnectionState,
} from '../store/app';
import UserContext from '../store/userContext';
import './i18n';


try {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const rawUser = cookies.get('user') || '{}';
  let user = JSON.parse(rawUser);
  const username = user.username || faker.name.findName();
  const userId = user.userId || `${username}${Date.now()}`;
  user = { username, userId };
  cookies.set('user', JSON.stringify(user));

  const socket = io();
  const store = configureStore({
    reducer: rootReducer,
  });
  socket.on('connect', () => {
    store.dispatch(unsetAppError('connectErr'));
    store.dispatch(setConnectionState(enumConnectionState('connect')));
  });

  socket.on('disconnect', () => {
    store.dispatch(setAppError({ id: 'connectErr', text: 'Server connection error' }));
    store.dispatch(setConnectionState(enumConnectionState('disconnect')));
  });

  socket.on('newMessage', (res) => {
    const { data: { attributes: message } } = res;
    if (message.userId !== user.userId) {
      store.dispatch(addMsgSuccess({ message }));
    }
  });

  socket.on('newChannel', (res) => {
    const { data: { attributes: channel } } = res;
    store.dispatch(addChannelSuccess({ channel }));
  });

  socket.on('renameChannel', (res) => {
    const { data: { attributes: channel } } = res;
    store.dispatch(updateChannelSuccess({ channel }));
  });

  socket.on('removeChannel', (res) => {
    const { data: { id } } = res;
    store.dispatch(removeChannelSuccess({ channelId: id }));
  });

  store.dispatch(initMessages({ messages: gon.messages }));
  store.dispatch(initChannels({ channels: gon.channels }));
  store.dispatch(setActiveChannelId({ channelId: gon.currentChannelId }));

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={user}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
} catch (err) {
  console.log(err); // eslint-disable-line no-console
  throw err;
}
