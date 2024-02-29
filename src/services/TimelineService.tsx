import axios from 'axios';
import { getToken } from 'utilities/Function/GetLocalStorage';
import config from '../config/ServerConfig';

const TIMELINE_API_PREFIX = 'timeline';
const url = `${config.hostname}:${config.backend_port}/${TIMELINE_API_PREFIX}`;
const axiosInstance = axios.create({
    baseURL: url
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (getToken()) {
            config.headers.token = getToken();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default class TimelineService {
    addTimeline(values: any) {
        return axiosInstance.post(`${url}/addTimeline`, values).then((res) => res.data);
    }

    editTimeline(values: any) {
        return axiosInstance.post(`${url}/editTimeline`, values).then((res) => res.data);
    }

    deleteTimeline(values: any) {
        return axiosInstance.post(`${url}/deleteTimeline`, values).then((res) => res.data);
    }

    getSubordinatesTimeline(values: any) {
        return axiosInstance.post(`${url}/getSubordinatesTimeline`, values).then((res) => res.data);
    }

    getOneSubordinatesTimeline(values: any) {
        return axiosInstance.post(`${url}/getOneSubordinatesTimeline`, values).then((res) => res.data);
    }

    getAvailability(values: any) {
        return axiosInstance.post(`${url}/getAvailability`, values).then((res) => res.data);
    }
}
