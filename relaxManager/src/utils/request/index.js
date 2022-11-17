import axios from 'axios';
import apiConfig from './config';
import { getToken } from '../storage'
import { message } from 'antd'
/**
 * @description 获取接口配置
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
        // 在发送请求之前做些什么
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
    
    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response.data;
      }, function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
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