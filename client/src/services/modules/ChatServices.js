import { axios } from '../axios'

/**
 * 
 * @param {Object} payload 
 * @returns Object
 * 
 * block user
 */
 export const getChatMessages = (payload) => {
    return axios.post('/chat/messages', payload)
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
 * block user
 */
export const blockUser = (payload) => {
    return axios.post('/chat/block', payload)
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
 * unblock user
 */
 export const unblockUser = (payload) => {
    return axios.post('/chat/unblock', payload)
        .then((response) => {
            return Promise.resolve(response)
        })
        .catch((error) =>{
            return Promise.reject(error) 
        });
}

