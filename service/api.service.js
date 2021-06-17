import { apiInstance } from "./axios.service";

const saveToken = async (token, uuid) => {
    try {
        await apiInstance.post('/token', {token, uuid});
    } catch (error) {
        console.log("Could not save token to server: ", error);
    }    
};

const startTimer = async () => {
    try {
        await apiInstance.post('/init');
    } catch (error) {
        console.log("Could not send message to server: ", JSON.stringify(error));
    }
};


export default {
    saveToken,
    startTimer
}