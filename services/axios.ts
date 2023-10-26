import axios from 'axios'
import { _loginStore } from '@/services/auth'
import { ElMessage } from 'element-plus'
// import router from '../'

export const axiosInstance = axios.create({
  baseURL: 'http://217.18.63.130:8000/api/',
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export interface AxiosResponse<T> {
  data: T
  headers: {
    file: string | null
  }
}

export interface BaseResponse<T> {
  content: T
  size: number
  page: number
  totalPages: number
  totalElements: number
  number: number
}
export function getResponse_DEFAULT() {
  return {
    content: [],
    size: 10,
    page: 1,
    totalPages: 0,
    totalElements: 0,
    number: 0
  }
}

axiosInstance.interceptors.request.use(
  (config: any) => {
    const {token}  = JSON.parse(localStorage.getItem('login')) || {}
    // const token = _loginStore.value?.token    
    if (config.url === '/auth/v1/public/signIn' || config.url === '/auth/v1/public/=signUp') {
        return config
    }
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    } 
    else {
    //   setTimeout(() => {
    //     location.reload()
    //   }, 500)
    //   localStorage.clear()
    //   router.push(`/auth/login?redirect=${location.pathname}`)
    //   return
    }

    return config
  },
  (error) => {

    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      _loginStore.value.token = ''
    //   router.push(`/login`)
    }
     {      

        if (error.response.data.code === 18) {
 
          ElMessage.error({
            message: (error.response.data.message),
            type: 'error',
            duration: 6555
          })
        } 
        
    }
   
    return Promise.reject(error)
  }
)
