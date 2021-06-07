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
import SoundService, {START_WORK, START_BREAK} from './sound.service';


const App: () => Node = () => {

  useEffect(() => {

    messaging().onNotificationOpenedApp(remoteMessage => {
      showAlert(remoteMessage);
    });

    messaging().getInitialNotification().then(remoteMessage => {
      showAlert(remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Received Message: ", JSON.stringify(remoteMessage));
      if (remoteMessage?.notification?.title === START_BREAK) {
        SoundService.playSound(START_BREAK);
        showAlert(remoteMessage);
      } else if (remoteMessage?.notification?.title === START_WORK) {
        SoundService.playSound(START_WORK);
        showAlert(remoteMessage);
      }
    });

    return unsubscribe;
  }, []);

  const showAlert = (remoteMessage) => {
    if (remoteMessage) {
      Alert.alert(
        remoteMessage?.notification?.title, 
        remoteMessage?.notification?.body,
        [
          {
            text: "Got it",
            onPress: SoundService.killSound
          }    
        ]
      );
    }
  };
  
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <Text>Hewo</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%', 
    width: '100%', 
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
