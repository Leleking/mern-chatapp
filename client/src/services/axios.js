import Axios from 'axios'
import { authHeader } from '../helpers/auth-header'
export const axios = Axios.create({ 
    baseURL: process.env.REACT_APP_API_DOMAIN,
    timeout: 10000,
    headers: {
        'X-Requested-With' : 'XMLHttpRequest'
    }
})

axios.interceptors.request.use( async config => {
   
    /**
     * if api is the login api, don't add the access token
     */
     /* if(!excludedRoutes.includes(config.url)) { */
     var token = authHeader()
     if(token && !config.headers.common.Authorization) {
         config.headers.common.Authorization = `${token}`
         
     }
     
     
 
     return config;
 })

const excludedRoutes = ['user/login']
