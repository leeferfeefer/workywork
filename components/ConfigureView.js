import React, {useState} from 'react';
import {
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Text
} from 'react-native';
import AxiosService from '../service/axios.service';
import AlertService from '../service/alert.service';

const ConfigureView = (props) => {
    const [apiUrl, setApiUrl] = useState('');
    const [loggerUrl, setLoggerUrl] = useState('');

    const saveButtonPressed = () => {
        try {
            AxiosService.saveUrls(apiUrl, loggerUrl);
        } catch (error) {
            AlertService.show('Uh-oh!', `Could not save due to error: ${error}`);
        }
    };

    const onApiUrlTextInputChange = (apiUrl) => {    
        setApiUrl(apiUrl);
    };

    const onLoggerUrlTextInputChange = (loggerUrl) => {        
        setLoggerUrl(loggerUrl);
    };

    const isSaveDisabled = !apiUrl || !loggerUrl;

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textInput}
                placeholderTextColor='gray' 
                placeholder='api url' 
                onChangeText={onApiUrlTextInputChange}
            />
            <TextInput                 
                style={styles.textInput}
                placeholderTextColor='gray'
                placeholder='logger url' 
                onChangeText={onLoggerUrlTextInputChange}
            />
            <TouchableHighlight disabled={isSaveDisabled} style={[styles.button, {backgroundColor: isSaveDisabled ? 'gray': 'blue'}]} onPress={saveButtonPressed}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        width: 300
    },
    button: {        
        height: 50, 
        width: 100,
        justifyContent: 'space-around'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        color: 'black'
    }
});

export default ConfigureView;