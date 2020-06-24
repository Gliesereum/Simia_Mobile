/**
 * @format
 */

import { AppRegistry, NativeModules } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  NativeModules.RNInvokeApp.invokeApp({ data: remoteMessage.data });
});

AppRegistry.registerComponent(appName, () => App);
