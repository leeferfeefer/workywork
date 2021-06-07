import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const START_BREAK = 'START_BREAK';
const START_WORK = 'START_WORK';

const App: () => Node = () => {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage?.notification?.title === START_BREAK 
        || remoteMessage?.notification?.title === START_WORK) {
        startMusic();
        showAlert(remoteMessage);
      }
    });
    return unsubscribe;
  }, []);

  const startMusic = () => {
    
  }

  const showAlert = (remoteMessage) => {
    Alert.alert(
      remoteMessage?.notification?.title, 
      remoteMessage?.notification?.body,
      [
        {
          text: "Got it",
          onPress: killAlarm
        }    
      ]
    );
  };

  // Stop music
  const killAlarm = () => {
    console.log("Alarm killed");
  }
  
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <View>
        <Text>Hewo</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
