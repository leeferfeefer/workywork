import firestore from '@react-native-firebase/firestore';

const COLLECTION = 'users';

const saveToken = async (token, uuid) => {
    try {
        await firestore().collection(COLLECTION).doc(uuid).set({token});
    } catch (error) {
        console.log("Could not save token: ", error);
    } 
};

export default {
    saveToken
}