import React from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import LoggerService from '../service/logger.service';

const LoginButton = (props) =>  {
    const {onPress, setLoading, onSuccess} = props;

    const loginButtonPressed = async () => {        
        try {
            await LoggerService.sendLog("DEBUG", "This is a test!");
            setLoading(true);
            await onPress(); // call save token which is passed in
            onSuccess();
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