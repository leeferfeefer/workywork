import axios from 'axios';
import { IP } from '@env';

const port = 8080;

const instance = axios.create({
    baseURL: `http://localhost:${port}`,
    timeout: 5000,
});

const saveToken = async (token, uuid) => {
    try {
        await instance.post('/token', {token, uuid});
    } catch (error) {
        console.log("Could not save token to server: ", error);
        throw error;
    }    
};

const startTimer = async () => {
    try {
        console.log(IP)
        await instance.post('/init/test');
    } catch (error) {
        console.log("Could not send message to server: ", JSON.stringify(error));
        throw error;
    }
};


export default {
    saveToken,
    startTimer
}