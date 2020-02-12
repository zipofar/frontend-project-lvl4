// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
import io from 'socket.io-client';

import Chat from './Chat';
import store from '../store';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const  socket = io('http://localhost:5000');
socket.on('newMessage', (res) => { console.log(res) }); 

console.log('gon', gon);

const mountNode = document.getElementById('chat');
ReactDOM.render(
  <Provider store={store}>
    <Chat channels={gon.channels} />
  </Provider>,
  mountNode
);