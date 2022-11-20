import axios from 'axios';
import apiConfig from './config';
import { getToken } from '../storage'
import { message } from 'antd'
/**
 * @description receive interface configuration
 * @param {String} str 
 * @return {Object} config
 * */ 
const getApiConfig = function(str) {
    var keys = str.split("."),res = apiConfig;
    keys.forEach(key => {
        res = res[key] || {};
    })
    return res;
}

const request = async function(url,config = {}) {
    const instance = axios.create({
        baseURL:process.env.SERVER_URL || "http://localhost:8080",
        timeout: 10000
    })

    config = Object.assign(config,getApiConfig(url))
    instance.interceptors.request.use(async function (config) {
        // do something before sending the request
        if(!config.formData) {
            config.headers["Content-type"] = "application/json"
        } else {
            config.headers["Content-type"] = "multipart/form-data"
        }
        if(config.query) {
            var qr = "?";
            Object.keys(config.query).forEach(key => {
                qr+= `${key}=${config.query[key]}&`
            })
            config.url += qr.substring(0,qr.length - 1)
        }
        config.headers['token'] = getToken() || '';
        return config;
      }, function (error) {
        return Promise.reject(error);
    });
    
    // Add response interceptor
    instance.interceptors.response.use(function (response) {
        // Status codes in the 2xx range will trigger this function.
        // do something with the response data
        return response.data;
      }, function (error) {
        // Status codes exceeding the 2xx range will trigger this function.
        // do something with the response error
        if(error.response && error.response.data && error.response.data.message) {
            message.error(error.response.data.message)
        } else {
            message.error('network error')
        }
        return Promise.reject(error);
    });

    return instance(config)
}

export default request;