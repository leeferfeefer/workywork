import axios from "axios";
import AxiosService from './axios.service';

const sendLog = async (type, body) => {
    try {
        await axios.post(`https://${AxiosService.getLoggerUrl()}/log`, {
            appName: 'WorkyWork',
            type,
            body
        });
    } catch (error) {        
        console.log("Could not send log: ", error);
    }
};


export default {
    sendLog
};