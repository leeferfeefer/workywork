import auth from '@react-native-firebase/auth';
import LoggerService from './logger.service';


const signInAnon = async () => {
    try {
        await auth().signInAnonymously();
        LoggerService.sendLog("DEBUG", "User signed in anonymously");        
    } catch (error) {
        if (error.code === 'auth/operation-not-allowed') {
            LoggerService.sendLog("Enable anonymous in firebase console.");        
        }
        console.error(error);
    }
};

export default {
    signInAnon
};