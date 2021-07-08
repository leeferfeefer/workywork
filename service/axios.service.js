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

const _getUrls = () => {
    const apiUrl = MMKV.getString(API_URL);
    const loggerUrl = MMKV.getString(LOGGER_URL);

    if (!apiUrl || !loggerUrl) {
        throw new Error("Cannot retrieve urls");
    }
    return {
        apiUrl,
        loggerUrl
    }
}

let apiInstance;
const getApiInstance = () => {
    const urls = _getUrls();    
    if (!apiInstance) {
        apiInstance = axios.create({
            baseURL: urls.apiUrl,
            timeout: 5000
        });
    }
    return apiInstance;
};

let loggerInstance;
const getLoggerInstance = () => {
    const urls = _getUrls();    
    if (!loggerInstance) {
        loggerInstance = axios.create({
            baseURL: urls.loggerUrl,
            timeout: 5000
        });
    }
    return loggerInstance;
};

export default {
    saveUrls,
    getApiInstance,
    getLoggerInstance
}