"use strict";

import Vue from 'vue';
import axios from "axios";

Vue.prototype.$http=axios
axios.defaults.baseURL='/api';
Vue.prototype.$get=GetWithToken;
Vue.prototype.$post=PostWithToken;

function GetWithToken(Url,Param,Function,NoErrFunction,ErrFunction,ExpFunction){
    axios.get(Url,{
        params:Param,
        headers:{
            'content-type': 'multipart/form-data',
            'function': Function,
            'token':localStorage.getItem('token'),
            'userid':localStorage.getItem('userid')
        }
    })
    .then(res => {
        console.log(res);
        if(res.headers.msg == "NO_ERROR"){
            NoErrFunction(res);
        }else{
            ErrFunction(res);
        }
    }) 
    .catch(err => {
        console.log(err);
        ExpFunction(err);
    })
}

function PostWithToken(Url,Val,Param,Function,NoErrFuncton,ErrFunction,ExpFunction){
    axios.post(Url,Val,{
        params:Param,
        headers:{
            'content-type': 'multipart/form-data',
            'function': Function,
            'token':localStorage.getItem('token'),
            'userid':localStorage.getItem('userid')
        }
    })
    .then(res => {
        console.log(res);
        if(res.headers.msg == "NO_ERROR"){
            NoErrFuncton(res);
        }else{
            ErrFunction(res);
        }
    })
    .catch(err => {
        console.log(err);
        ExpFunction(err);
    });
}
/*
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
*/