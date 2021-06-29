import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Switch,
  Text,
  ActivityIndicator
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import SoundService, {START_WORK, START_BREAK} from './service/sound.service';
import LoginButton from './components/LoginButton';
import FirebaseService from './service/firebase.service';
import StartButton from './components/StartButton';
import ApiService from './service/api.service';
import DeviceInfoService from './service/deviceInfo.service';
import LoggerService from './service/logger.service';

const FB_STATE_LOCAL = 'FB_STATE_LOCAL';
const FB_STATE_REMOTE = 'FB_STATE_REMOTE';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let fbStateType = isSwitchEnabled ? FB_STATE_REMOTE : FB_STATE_LOCAL;

  const saveToken = async (refreshToken) => {
    const token = refreshToken ?? await messaging().getToken();
    const uuid = DeviceInfoService.getUUID();
    if (fbStateType === FB_STATE_LOCAL) {
      await FirebaseService.saveToken(token, uuid);
    } else if (fbStateType === FB_STATE_REMOTE) {
      await ApiService.saveToken(token, uuid);
    }
  };

  useEffect(() => {
    return messaging().onTokenRefresh(saveToken);
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      showAlert(remoteMessage);
    });

    messaging().getInitialNotification().then(remoteMessage => {
      showAlert(remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await LoggerService.sendLog("DEBUG", "Received in foreground!");
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
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'}/>
      <View style={styles.container}>
        {isLoading && 
          <View style={styles.loadingView}>
            <ActivityIndicator animating size='large' color='red'/>
          </View>
        }
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          isEnabled={isSwitchEnabled}
        />
        <Text>{isSwitchEnabled ? 'Remote' : 'Local'}</Text>
        <View style={styles.innerContainer}>
          {!isLoggedIn &&
            <LoginButton 
              onPress={saveToken}
              onSuccess={() => setIsLoggedIn(true)} 
              setLoading={setIsLoading}            
            />
          }
          {isLoggedIn &&
            <StartButton setLoading={setIsLoading}/>
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
    backgroundColor: 'gray',
    alignItems: 'center'
  },
  innerContainer: {
    marginTop: 500
  },
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
