import React from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

const LoginButton = (props) =>  {
    const {onPress, setLoading, onSuccess} = props;

    const loginButtonPressed = async () => {        
        setLoading(true);
        try {
            await onPress(); // call save token which is passed in
            const userState = await getUserState();
            onSuccess(userState);
        } catch (error) {
            AlertService.show("Uh-oh!", `Could not login due to error: ${error}`);
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