import axios from 'axios';
import { getToken } from 'utilities/Function/GetLocalStorage';
import config from '../config/ServerConfig';

const ITEM_API_PREFIX = 'item';
const url = `${config.hostname}:${config.backend_port}/${ITEM_API_PREFIX}`;
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

export default class ItemService {
    getItemByCategory(values: any) {
        return axiosInstance.post(`${url}/getItemByCategory`, values).then((res) => res.data);
    }
}
