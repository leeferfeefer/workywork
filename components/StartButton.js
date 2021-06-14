import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import AxiosService from '../service/axios.service';

const StartButton = (props) =>  {

    const startButtonPressed = async () => {
        try {
            await AxiosService.startTimer();
        } catch (error) {
            console.log("Error in starting timer: ", error);
        }        
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