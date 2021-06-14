import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import FirebaseService from '../service/firebase.service';

const LoginButton = (props) =>  {
    const {firebaseStateType, setLoading, callback} = props;

    const loginButtonPressed = async () => {
        try {
            setLoading(true);
            const token = await messaging().getToken();
            console.log("token", token)
            await FirebaseService.saveToken(token, firebaseStateType);        
            callback();
        } catch (error) {
            console.log("Error in logging in. Could not save token: ", error);
        }        
        setLoading(false);
    }

    return (    
        <TouchableHighlight style={styles.button} onPress={loginButtonPressed}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    button: { 
      backgroundColor: 'blue',
      height: 50, 
      width: 100,
      justifyContent: 'space-around'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
  });

export default LoginButton;