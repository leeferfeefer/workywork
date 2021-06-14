import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Switch,
  Text
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import SoundService, {START_WORK, START_BREAK} from './service/sound.service';
import LoginButton from './components/LoginButton';
import FirebaseService from './service/firebase.service';
import StartButton from './components/StartButton';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  let fbStateType = isSwitchEnabled ? FirebaseService.FB_STATE_REMOTE : FirebaseService.FB_STATE_LOCAL;

  useEffect(() => {
    return messaging().onTokenRefresh(token => {
      FirebaseService.saveToken(token, fbStateType);
    });
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      showAlert(remoteMessage);
    });

    messaging().getInitialNotification().then(remoteMessage => {
      showAlert(remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Received Message in foreground: ", JSON.stringify(remoteMessage));
      if (remoteMessage?.notification?.title === START_BREAK) {
        await SoundService.playSound(START_BREAK);
        showAlert(remoteMessage);
      } else if (remoteMessage?.notification?.title === START_WORK) {
        await SoundService.playSound(START_WORK);
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

  const toggleSwitch = (state) => {
    setIsSwitchEnabled(previousState => !previousState);
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'}/>
      <View style={styles.container}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          isEnabled={isSwitchEnabled}
        />
        <Text>{isSwitchEnabled ? 'Remote' : 'Local'}</Text>
        <View style={styles.innerContainer}>
          {!isLoggedIn &&
            <LoginButton callback={() => setIsLoggedIn(true)} firebaseStateType={fbStateType}/>
          }
          {isLoggedIn &&
            <StartButton/>
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%', 
    width: '100%', 
    backgroundColor: 'white',
    alignItems: 'center'
  },
  innerContainer: {
    marginTop: 500
  }
});

export default App;
