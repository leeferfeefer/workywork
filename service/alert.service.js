import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';


const show = (title, message, callback) => {
    Alert.alert(
        title, 
        message,
        [
            {
                text: "Got it",
                onPress: callback
            }    
        ]
    );
};

export default {
    show
}