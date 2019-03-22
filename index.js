/**
 * @format
 */
import firebase from 'firebase';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox = true;

var config = {
    apiKey: "AIzaSyBUq-Ljxz1dATPVN9hsQ04FPQIsbkKE20k",
    authDomain: "zigger-fab73.firebaseapp.com",
    databaseURL: "https://zigger-fab73.firebaseio.com",
    projectId: "zigger-fab73",
    storageBucket: "zigger-fab73.appspot.com",
    messagingSenderId: "956151236817"
};

firebase.initializeApp(config);

AppRegistry.registerComponent(appName, () => App);
