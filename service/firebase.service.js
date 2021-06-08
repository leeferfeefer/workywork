import firestore from '@react-native-firebase/firestore';
import DeviceService from './device.service';


const storeToken = (token) => {
    const storedToken = getStoredToken();
    if (!storedToken) {
        const uuid = DeviceService.getUUID();

        firestore().collection('user_token').add({
            token,
            uuid
        }).then(() => {
            console.log('Token Saved!');
        });
    }
};

const getStoredToken = () => {

};



export default {
    storeToken
}