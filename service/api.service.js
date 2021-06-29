import { apiInstance } from "./axios.service";
import LoggerService from "./logger.service";

const saveToken = async (token, uuid) => {
    try {
        await apiInstance.post('/token', {token, uuid});
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not save token to server");
        LoggerService.sendLog("ERROR", error);
    }    
};

const startTimer = async () => {
    try {
        await apiInstance.post('/init');
    } catch (error) {
        LoggerService.sendLog("ERROR", "Could not send message to server");
        LoggerService.sendLog("ERROR", error);
    }
};


export default {
    saveToken,
    startTimer
}