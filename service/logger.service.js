import AxiosService from './axios.service';

const sendLog = async (type, body) => {
    try {
        await AxiosService.getLoggerInstance().post('/log', {
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