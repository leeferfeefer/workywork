import React, {useState, useEffect} from 'react';
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
    const {hideConfigureView} = props;
    const [apiUrl, setApiUrl] = useState('');
    const [loggerUrl, setLoggerUrl] = useState('');

    useEffect(() => {
        try {
            setApiUrl(AxiosService.getApiUrl());
            setLoggerUrl(AxiosService.getLoggerUrl());
        } catch (error) {}
    }, []);

    const saveButtonPressed = () => {
        try {
            AxiosService.saveUrls(apiUrl, loggerUrl);
            AlertService.show("Nice!", "Url values saved!", hideConfigureView);
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
            <Text style={styles.titleText}>No need to type https://</Text>
            <TextInput 
                style={styles.textInput}
                placeholderTextColor='gray' 
                placeholder='api url' 
                onChangeText={onApiUrlTextInputChange}
                value={apiUrl}
            />
            <TextInput                 
                style={styles.textInput}
                placeholderTextColor='gray'
                placeholder='logger url' 
                onChangeText={onLoggerUrlTextInputChange}
                value={loggerUrl}
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
        alignItems: 'center'
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
        color: 'black',
        width: 250,
        textAlign: 'center'
    },
    titleText: {
        color: 'black'
    }
});

export default ConfigureView;