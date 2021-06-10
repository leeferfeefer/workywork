/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import SoundService, {START_WORK, START_BREAK} from './service/sound.service';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Received Message: ", JSON.stringify(remoteMessage));
    try {
        if (remoteMessage?.notification?.title === START_BREAK) {
            SoundService.playSound(START_BREAK);
        } else if (remoteMessage?.notification?.title === START_WORK) {        
            SoundService.playSound(START_WORK);
        }   
    } catch (error) {
        console.log("error playing in background: ", error);
    }
});

AppRegistry.registerComponent(appName, () => App);
