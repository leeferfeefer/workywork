import axios from 'axios';
import { MMKV } from 'react-native-mmkv';

const API_URL = 'API_URL';
const LOGGER_URL = 'LOGGER_URL';

const saveUrls = (apiUrl, loggerUrl) => {
    if (!apiUrl || !loggerUrl) {
        throw new Error("Cannot save invalid urls");
    }
    MMKV.set(API_URL, apiUrl);
    MMKV.set(LOGGER_URL, loggerUrl);
};

const getApiUrl = () => {
    const apiUrl = MMKV.getString(API_URL);
    if (!apiUrl) {
        throw new Error("Cannot retrieve api url");
    }
    return apiUrl;
};

const getLoggerUrl = () => {
    const loggerUrl = MMKV.getString(LOGGER_URL);
    if (!loggerUrl) {
        throw new Error("Cannot retrieve urls");
    }
    return loggerUrl;
};

export default {
    saveUrls,
    getApiUrl,
    getLoggerUrl
}