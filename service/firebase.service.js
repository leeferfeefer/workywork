import firestore from '@react-native-firebase/firestore';
import DeviceInfoService from './deviceInfo.service';
import AxiosService from './axios.service';

const FB_STATE_LOCAL = 'FB_STATE_LOCAL';
const FB_STATE_REMOTE = 'FB_STATE_REMOTE';
const COLLECTION = 'users';

const saveToken = async (token, fbStateType) => {
    try {
        const uuid = DeviceInfoService.getUUID();
        if (fbStateType === FB_STATE_LOCAL) {
            await firestore().collection(COLLECTION).doc(uuid).set({token});
        } else if (fbStateType === FB_STATE_REMOTE) {
            await AxiosService.saveToken(token, uuid);
        }
        console.log("success")
    } catch (error) {
        console.log("Could not save token: ", error);
        throw error;
    } 
};

export default {
    saveToken,
    FB_STATE_LOCAL,
    FB_STATE_REMOTE
}