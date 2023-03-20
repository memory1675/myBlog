import axios from "axios";

const request = axios.create({
    baseURL: "/api",
    timeout: 5000
})

declare module "axios" {
    interface AxiosResponse<T = any> {
      flag: boolean;
      message: string;
      // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

request.interceptors.request.use(req => {
    return req
})

request.interceptors.response.use(response => {
    if(response.status == 200){
        return response.data
    }
})

export default request