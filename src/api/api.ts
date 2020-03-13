import * as axios from 'axios';
import {IregistrationData,IdefaultRequest, IloginData} from './apiType';
import {IuserInfo} from '../redux/userReducerType';

const axiosBase = axios.default.create({
  baseURL: 'http://localhost:5555/'
})

export const registrationRequest = (data: IregistrationData) => axiosBase.post<IdefaultRequest<IuserInfo>>('/registration',data)
  .then(info => info.data);
export const loginRequest = (data: IloginData) => axiosBase.put<IdefaultRequest<IuserInfo>>('/login',data)
  .then(info => info.data);