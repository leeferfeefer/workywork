import React from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import APIService from '../service/api.service';

const StartButton = (props) =>  {
    const {setLoading} = props;

    const startButtonPressed = async () => {    
        setLoading(true);
        await APIService.startTimer();  
        setLoading(false);
    }

    return (    
        <TouchableHighlight style={styles.button} onPress={startButtonPressed}>
            <Text style={styles.buttonText}>Start</Text>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    button: { 
      backgroundColor: 'green',
      height: 100, 
      width: 100,
      borderRadius: 50,
      justifyContent: 'space-around'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
  });

export default StartButton;