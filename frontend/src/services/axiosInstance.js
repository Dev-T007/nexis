import axios from 'axios';
import { API_BASE_URL } from '../constants';
import store from "../store/store";
import { logout } from "../features/auth/authSlice";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

const NO_REFRESH_ROUTES = [
  "/users/login",
  "/users/register",
  "/users/refresh-token",
];

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        }
        else {
            prom.resolve(token);
        }
    })
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        const isAuthRoute = NO_REFRESH_ROUTES.some((route) =>
          originalRequest.url?.includes(route),
        );

        if (error.response && error.response.status === 401 && !isAuthRoute && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => 
                    axiosInstance(originalRequest))
                .catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try{
                const response = await axiosInstance.post('/users/refresh-token');
                processQueue(null);
                return axiosInstance(originalRequest);
            }
            catch (err) {
                processQueue(err, null);
                localStorage.removeItem('user');
                store.dispatch(logout());
                window.location.href = '/login';
                return Promise.reject(err);
            }
            finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    });

export default axiosInstance;