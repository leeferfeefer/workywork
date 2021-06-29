import TrackPlayer from 'react-native-track-player';
import LoggerService from './logger.service';

export const START_BREAK = 'START_BREAK';
export const START_WORK = 'START_WORK';

const playSound = async (sound) => {
    try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.reset();
        await TrackPlayer.add({
            id: 'trackId',
            url: sound === START_WORK ? require('../android/app/src/main/res/raw/work_time.m4a') : require('../android/app/src/main/res/raw/break_time.m4a'),
            title: 'Track Title',
            artist: 'Track Artist',
        });
        await TrackPlayer.play();
        await LoggerService.sendLog("DEBUG", "Playing sound...");
    } catch (error) {
        LoggerService.sendLog("ERROR", "Failure in playing sound");
        LoggerService.sendLog("ERROR", error);
    }  
};

const killSound = async () => {
    try {
        await TrackPlayer.stop();
        await LoggerService.sendLog("DEBUG", "Killing sound...");
    } catch (error) {
        LoggerService.sendLog("ERROR", "Failure in killing sound");
        LoggerService.sendLog("ERROR", error);
    }
};

export default {
    playSound,
    killSound
}