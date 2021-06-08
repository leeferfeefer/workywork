import TrackPlayer from 'react-native-track-player';

export const START_BREAK = 'START_BREAK';
export const START_WORK = 'START_WORK';

const start = async (sound) => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.reset();
    await TrackPlayer.add({
        id: 'trackId',
        url: sound === START_WORK ? require('../android/app/src/main/res/raw/work_time.m4a') : require('../android/app/src/main/res/raw/break_time.m4a'),
        title: 'Track Title',
        artist: 'Track Artist',
    });

    await TrackPlayer.play();
};

const playSound = (sound) => {
    start(sound);
};

const killSound = async () => {
    await TrackPlayer.stop();
};

export default {
    playSound,
    killSound
}