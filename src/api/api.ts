import * as axios from 'axios';
import {IregistrationData,IdefaultRequest} from './apiType';
import {IuserInfo} from '../redux/authReducerType';

const axiosBase = axios.default.create({
  baseURL: 'http://localhost:5555/'
})

export const registrationRequers = (data: IregistrationData) => axiosBase.post<IdefaultRequest<IuserInfo>>('/registration')
  .then(info => info.data);