import axios from 'axios';
import { getHeaders } from '@Helpers/common';
import { getCookie, deleteCookie } from '@Helpers/cookie';

const apiUrl = import.meta.env.VITE_API_URL;
const cookieName = import.meta.env.VITE_COOKIE_NAME;

export default class ApiCore {
    constructor() {
        this.client = axios.create({
            baseURL: apiUrl,
            headers: {
                ...getHeaders()
            },
            withCredentials: true,
        });

        // Modify request interceptor
        this.client.interceptors.request.use(function (config) {
            const token = getCookie(cookieName);
            config.headers.Authorization = 'Bearer ' + token;
            return config;
        });

        // Modify response interceptor
        this.client.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response.status === 401) {
                deleteCookie(cookieName);
            }
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            }

            return Promise.reject(error.message);
        });
    }

    get(url, config) {
        return this.client.get(url, config);
    }

    delete(url, config) {
        return this.client.delete(url, config);
    }

    post(url, data, config) {
        return this.client.post(url, data, config);
    }

    put(url, data, config) {
        return this.client.put(url, data, config);
    }

    patch(url, data, config) {
        return this.client.patch(url, data, config);
    }
}
