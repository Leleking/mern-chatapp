import { axios } from '../axios'

/**
 * 
 * @param {Object} payload 
 * @returns Object
 * 
 * SignIn Service takes {email, password} as payload
 */
export const signIn = (payload) => {
    return axios.post('/auth/signin', payload)
        .then((response) => {
            return Promise.resolve(response)
        })
        .catch((error) =>{
            return Promise.reject(error) 
        });
}

/**
 * 
 * @param {Object} payload 
 * @returns Object
 * 
 * 
 */
export const register = (payload) => {
    return axios.post('/auth/register', payload)
        .then((response) => {
            return Promise.resolve(response)
        })
        .catch((error) =>{
            return Promise.reject(error) 
        });
}

export const logout = () => {
    localStorage.removeItem("user")
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export const getUser = (payload) => {
    return axios.post('chat/getUser', payload)
        .then((response) => {
            return Promise.resolve(response)
        })
        .catch((error) =>{
            return Promise.reject(error) 
        });
}