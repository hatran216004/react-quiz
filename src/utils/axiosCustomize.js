import axios from 'axios';
import NProgress from 'nprogress';
import { store } from '../redux/store';
import axiosRetry from 'axios-retry';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});

const instance = axios.create({
    baseURL: 'http://localhost:8081/api/',
});

axiosRetry(instance, {
    retries: 3,
    retryCondition: (error) => {
        return error.response.status === 401;
    },
    retryDelay: (retryCount, error) => {
        return retryCount * 1000;
    },
});
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        const access_token = store?.getState()?.user?.account?.access_token;
        config.headers['Authorization'] = `Bearer ${access_token}`;
        NProgress.start();
        // Do something before request is sent
        return config;
    },
    function (error) {
        NProgress.done();
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        NProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response && response.data ? response.data : response;
    },
    async function (error) {
        // token expired
        NProgress.done();
        if (error.response.data && error.response.data.EC === -999) {
            window.location.href = '/login';
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
    },
);

export default instance;
