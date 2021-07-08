import React, {useEffect, useState, useRef} from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
	AppState,
	ActivityIndicator
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import SoundService, {START_WORK, START_BREAK} from './service/sound.service';
import LoginButton from './components/LoginButton';
import ApiService from './service/api.service';
import DeviceInfoService from './service/deviceInfo.service';
import LoggerService from './service/logger.service';
import SplashScreen from 'react-native-splash-screen'
import AlertService from './service/alert.service';
import TimerButton from './components/TimerButton';
import apiService from './service/api.service';
import ConfigureButton from './components/ConfigureButton';
import ConfigureView from './components/ConfigureView';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
    const [timerState, setTimerState] = useState(false);
    const [isConfigureShowing, setIsConfigureShowing] = useState(false);
    const uuid = DeviceInfoService.getUUID();
    const appState = useRef(AppState.currentState);

	const saveToken = async (refreshToken) => {
        const token = refreshToken ?? await messaging().getToken();
        await ApiService.saveToken(uuid, token);
	};
  
    useEffect(() => {
        getUserInfo();
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);
  
    const _handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === "active") {
            getUserInfo();
        }
        appState.current = nextAppState;
    };

    const getUserInfo = async () => {
        try {
            const response = await apiService.getUserInfo(uuid);
            setTimerState(response?.data?.timerState);
        } catch (error) {
            AlertService.show("Uh-oh!", `Could not get user info due to error: ${error}`);
        }
    };

	useEffect(() => {
		SplashScreen.hide();
		return messaging().onTokenRefresh(saveToken);
	}, []);

    const showNotificationAlert = () => {
        AlertService.show(
            remoteMessage.notification?.title,
            remoteMessage.notification?.body,
            SoundService.killSound
        );
    }

	useEffect(() => {
		messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                showNotificationAlert();
            }			
		});

		messaging().getInitialNotification().then(remoteMessage => {
			if (remoteMessage) {
                showNotificationAlert();
            }
		});

		const unsubscribe = messaging().onMessage(async remoteMessage => {
			LoggerService.sendLog("DEBUG", "Received in foreground!");
			if (remoteMessage?.notification?.title === START_BREAK) {
				await SoundService.playSound(START_BREAK);
				showNotificationAlert();
			} else if (remoteMessage?.notification?.title === START_WORK) {
				await SoundService.playSound(START_WORK);
				showNotificationAlert();
			}
		});
		return unsubscribe;
	}, []);

    const loginOnSuccess = () => {
        setIsLoggedIn(true)
    }

    const configureButtonPressed = () => {
        setIsConfigureShowing((currentState) => !currentState);
    }

	return (
		<SafeAreaView>
			<StatusBar backgroundColor='gray' barStyle="dark-content"/>
			<View style={styles.container}>
				{isLoading && 
					<View style={styles.loadingView}>
						<ActivityIndicator animating size='large' color='red'/>
					</View>
				}
                {isConfigureShowing && 
                    <ConfigureView/>
                }
				<View style={styles.innerContainer}>                    

                    <ConfigureButton onPress={configureButtonPressed}/>

					{!isLoggedIn &&
						<LoginButton 
							onPress={saveToken}
							onSuccess={loginOnSuccess} 
							setLoading={setIsLoading}            
						/>
					}
					{isLoggedIn &&
						<TimerButton 
                            setLoading={setIsLoading} 
                            timerState={timerState}
                            setTimerState={setTimerState}
                        />
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
		alignItems: 'center',
        justifyContent: 'space-evenly'
	},
	innerContainer: {
        
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
