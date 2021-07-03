import firestore from '@react-native-firebase/firestore';
import LoggerService from './logger.service';

const COLLECTION = 'users';

const saveToken = async (token, uuid) => {
    try {
        await firestore().collection(COLLECTION).doc(uuid).set({token});
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not save token to server");
        LoggerService.sendLog("ERROR", error);
        throw error;
    } 
};

export default {
    saveToken
}