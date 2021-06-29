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
            setLoading(true);
            await onPress(); // call save token which is passed in
            onSuccess();
        } catch (error) {
            LoggerService.sendLog("ERROR", "Error in logging in. Could not save token");
            LoggerService.sendLog("ERROR", error);
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