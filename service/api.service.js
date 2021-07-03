import { apiInstance } from "./axios.service";
import LoggerService from "./logger.service";

const saveToken = async (token, uuid) => {
    try {
        await apiInstance.post('/token', {token, uuid});
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not save token to server");
        LoggerService.sendLog("ERROR", error);
        throw error;
    }    
};

const startTimer = async () => {
    try {
        await apiInstance.post('/timer/start');
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not send start message to server");
        LoggerService.sendLog("ERROR", error);   
        throw error;     
    }
};

const stopTimer = async () => {
    try {
        await apiInstance.post('/timer/stop');
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not send stop message to server");
        LoggerService.sendLog("ERROR", error);   
        throw error;     
    }
}


export default {
    saveToken,
    startTimer,
    stopTimer
}