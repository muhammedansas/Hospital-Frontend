import axios from 'axios' 
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'

export const baseURL = 'http://127.0.0.1:8000/'

let authTokens = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')):null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${authTokens?.access}`}
});

// axiosInstance.interceptors.request.use(async req =>{
//     if(!authTokens){
//         authTokens = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')):null
//         req.headers.Authorization = `Bearer ${authTokens?.access}`
//     }

//     const user = jwtDecode(authTokens.access)
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
//     if(!isExpired) return req
    
//     const response = await axios.post(`${baseURL}/api/refresh/`,{
//         refresh:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjk1Njc2MywiaWF0IjoxNzIyODcwMzYzLCJqdGkiOiJmMWYyMDVlYjE0Zjg0M2Y1OTUyN2MxNTdiOGM5MTU1NCIsInVzZXJfaWQiOjIwLCJ1c2VybmFtZSI6ImFuc2FhYWFhc3NzcyIsImlzX2RvY3RvciI6dHJ1ZSwiaXNfYWRtaW4iOmZhbHNlLCJpc19hY3RpdmUiOnRydWUsImJsb2NrZWQiOmZhbHNlfQ.CfrKImDLLajCOEJfApb3L-zZG3ZIMH_RRUyoyiaN91w"      });
    
//     localStorage.setItem('authToken', JSON.stringify(response.data))
//     console.log('local storage');
//     req.headers.Authorization = `Bearer ${response.data.access}`
//     return req
// })

export default axiosInstance;