import React from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import APIService from '../service/api.service';
import AlertService from '../service/alert.service';

const TimerButton = (props) =>  {
    const {setLoading, timerState} = props;

    const timerButtonPressed = async () => {    
        setLoading(true);
        try {
            if (timerState) {
                await APIService.stopTimer();
            } else if (!timerState) {
                await APIService.startTimer();
            }
        } catch (error) {
            AlertService.show("Uh-oh!", `Could not change timer state based on error: ${error}`);
        }
        setLoading(false);
    }

    return (    
        <TouchableHighlight style={{...styles.button, backgroundColor: timerState ? 'red': 'green'}} onPress={timerButtonPressed}>
            <Text style={styles.buttonText}>Start</Text>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    button: { 
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

export default TimerButton;