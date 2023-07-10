import axios from 'axios'
import { BASE_URL } from '../vue_config/pro.js'
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
})

service.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    token ? config.headers.Authorization = token : null
    return config
})
export default service