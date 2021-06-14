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
    const {firebaseStateType} = props;

    const loginButtonPressed = async () => {
        try {
            const token = await messaging().getToken();
            await FirebaseService.saveToken(token, firebaseStateType);        
            props.callback();
        } catch (error) {
            console.log("Error in logging in. Could not save token: ", error);
        }        
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