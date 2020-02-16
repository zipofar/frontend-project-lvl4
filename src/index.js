// @ts-check
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
import { initMessages, addMsgSuccess } from '../store/messages';
import { initChannels, setActiveChannelId } from '../store/channels';

console.log('gon', gon);

if (process.env.NODE_ENV !== 'production') {
  //localStorage.debug = 'chat:*';
  //localStorage.debug = '*';
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

socket.on('newMessage', (res) => {
  const { data: { attributes } } = res;
  if (attributes.userId !== user.userId) {
    store.dispatch(addMsgSuccess(attributes));
  }
}); 

socket.on('pong', (res) => {
  console.log('PONG')
  console.log(socket)
  console.log(res)
}); 
socket.on('ping', (res) => {
  console.log('PING')
  console.log(res)
}); 
socket.on('connect_error', (res) => {
  console.log('connect_error')
  console.log(res)
}); 
socket.on('reconnect_attempt', (res) => {
  console.log('reconnect_attempt')
  console.log(res)
}); 
socket.on('connect', (res) => {
  console.log('connect')
  console.log(res)
}); 
socket.on('disconnect', (res) => {
  console.log('disconnect')
  console.log(res)
}); 

store.dispatch(initMessages(gon.messages));
store.dispatch(initChannels(gon.channels));
store.dispatch(setActiveChannelId(gon.currentChannelId));

const UserContext = React.createContext({});

ReactDOM.render(
  <Provider store={store}>
    <UserContext.Provider value={user}>
      <App />
    </UserContext.Provider>
  </Provider>,
  document.getElementById('chat')
);

export { UserContext };