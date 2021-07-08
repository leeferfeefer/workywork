import React from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

const ConfigureButton = (props) =>  {
    const {onPress} = props;

    const configureButtonPressed = () => {        
        onPress();
    }

    return (    
        <TouchableHighlight style={styles.button} onPress={configureButtonPressed}>
            <Text style={styles.buttonText}>Configure</Text>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    button: { 
      backgroundColor: 'black',
      height: 50, 
      width: 100,
      justifyContent: 'space-around',
      marginBottom: 50
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
});

export default ConfigureButton;