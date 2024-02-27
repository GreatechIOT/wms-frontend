import axios from 'axios';
import { getToken } from 'utilities/Function/GetLocalStorage';

import config, { loginConfig } from '../config/ServerConfig';

const USER_API_PREFIX = 'users';
const url = `${config.hostname}:${config.backend_port}/${USER_API_PREFIX}`;
const loginUrl = `${loginConfig.hostname}:${loginConfig.backend_port}/${USER_API_PREFIX}`;
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

export default class UserService {
    login(values: any) {
        return axiosInstance.post(`${loginUrl}/login`, values).then((res) => res.data);
    }

    verifyToken(token: string) {
        return axiosInstance.post(`${url}/verifyToken`, { token }).then((res) => res.data);
    }

    forgetPassword(values: any) {
        return axiosInstance.post(`${loginUrl}/forgetPassword`, values).then((res) => res.data);
    }

    resetPassword(values: any) {
        return axiosInstance.post(`${loginUrl}/resetPassword`, values).then((res) => res.data);
    }

    getSubordinates(values: any) {
        return axiosInstance.post(`${url}/getSubordinates`, values).then((res) => res.data);
    }

}
