import { apiInstance } from "./axios.service";
import LoggerService from "./logger.service";

const saveToken = async (uuid, token) => {
    try {
        await apiInstance.post('/token', {uuid, token});
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not save token to server");
        LoggerService.sendLog("ERROR", error);
        throw error;
    }    
};

const updateTimerState = async (uuid, timerState) => {
    try {
        await apiInstance.post('/user/timer', {uuid, timerState});
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not update timer state on server");
        LoggerService.sendLog("ERROR", error);
        throw error;
    }  
};

const getUserInfo = async (uuid) => {
    try {
        return await apiInstance.get('/user', {params: {uuid}});
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not get user info from server");
        LoggerService.sendLog("ERROR", error);
        throw error;
    }  
};

const startTimer = async (uuid) => {
    try {
        await apiInstance.post('/timer/start', {uuid});
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not send start message to server");
        LoggerService.sendLog("ERROR", error);   
        throw error;     
    }
};

const stopTimer = async (uuid) => {
    try {
        await apiInstance.post('/timer/stop', {uuid});
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not send stop message to server");
        LoggerService.sendLog("ERROR", error);   
        throw error;     
    }
}


export default {
    saveToken,
    updateTimerState, 
    getUserInfo,
    startTimer,
    stopTimer
}