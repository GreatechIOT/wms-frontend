import axios from 'axios';
import { getToken } from 'utilities/Function/GetLocalStorage';
import config from '../config/ServerConfig';

const CATEGORY_API_PREFIX = 'category';
const url = `${config.hostname}:${config.backend_port}/${CATEGORY_API_PREFIX}`;
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

export default class CategoryService {
    getActiveCategoryForItem(values: any) {
        return axiosInstance.post(`${url}/getActiveCategoryForItem`, values).then((res) => res.data);
    }
}

