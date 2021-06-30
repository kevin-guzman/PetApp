import axios from 'axios'
import {BASE_URL} from './config'
const axios_instance = axios.create({
    baseURL: BASE_URL,
})

const defaultThen = (response) => {
    return {status: response.status, data: response.data}
}

const defaultCatch = (err) => {
    err = err.response
    console.log('error->', err);
    return {status: err.status, data: err.data}
}


export function User (multipart=false) {
    const user_instance = axios.create({
        baseURL: `${BASE_URL}/user`
    })
    const auth_instance = axios.create({
        baseURL: `${BASE_URL}/user/auth`
    })
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
        }
    };
    async function logIn (email='', password=''){
        return auth_instance.post('/singin', JSON.stringify({email, password}), config)
        .then(defaultThen)
        .catch(defaultCatch)
    }
    async function singUp (form){
        return auth_instance.post('/singUp', form, config)
        .then(defaultThen)
        .catch(defaultCatch)
    }
    async function getUserInfo (id){
        return user_instance.get(`/${id}`, config)
        .then(defaultThen)
        .catch(defaultCatch)
    }
    return{
        logIn,
        singUp,
        getUserInfo,
    }
}

export function Publications (multipart=false) {
    const publication_instance = axios.create({
        baseURL: `${BASE_URL}/publications`
    })
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
        }
    };
    async function getAllPublications (){
        return publication_instance.get(`/`, config)
        .then(defaultThen)
        .catch(defaultCatch)
    }
    return{
        getAllPublications,
    }
}
