import DeviceInfo from 'react-native-device-info';

const getUUID = () => {
    return DeviceInfo.getUniqueId();
}

export default {
    getUUID
}