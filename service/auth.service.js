import auth from '@react-native-firebase/auth';


const signInAnon = async () => {
    try {
        await auth().signInAnonymously();
        console.log('User signed in anonymously');
    } catch (error) {
        if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
    }
};

export default {
    signInAnon
};