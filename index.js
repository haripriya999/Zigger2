/**
 * @format
 */
import firebase from 'firebase';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox = true;

var config = {
    XXX
};

firebase.initializeApp(config);

AppRegistry.registerComponent(appName, () => App);
