import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyBD5NYjF6UTQft4SaPrlJvFLWt567mi4Pg",
  authDomain: "resold-52a98.firebaseapp.com",
  databaseURL: "https://resold-52a98.firebaseio.com",
  projectId: "resold-52a98",
  storageBucket: "resold-52a98.appspot.com",
};
// Initialize Firebase
var fb = firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App firebase={fb}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();