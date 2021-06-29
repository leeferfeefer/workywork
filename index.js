import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import SoundService, {START_WORK, START_BREAK} from './service/sound.service';
import LoggerService from './service/logger.service';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    try {
        await LoggerService.sendLog("DEBUG", "Received in background!");
        if (remoteMessage?.notification?.title === START_BREAK) {
            await SoundService.playSound(START_BREAK);
        } else if (remoteMessage?.notification?.title === START_WORK) {        
            await SoundService.playSound(START_WORK);
        }   
    } catch (error) {
        LoggerService.sendLog("DEBUG", "Received in background!");
    }
});

AppRegistry.registerComponent(appName, () => App);
