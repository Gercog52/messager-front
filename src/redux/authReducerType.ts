import {IsetUserClient, IsetUser, IresetUser} from './userReducerType';

export const AUTH_USER = 'AUTH_USER'
export const SET_ERROR_MESSAG_AUTH = 'SET_ERROR_MESSAG_AUTH'
export const LOG_OUT_USER = 'LOG_OUT_USER' 
export const SET_CURRENT_USER_CLIENT = 'SET_CURRENT_USER_CLIENT'


export interface Iauth {
  type: typeof AUTH_USER
}
export interface IlogOutUser {
  type: typeof LOG_OUT_USER
}
export interface IsetAuthErrorMessag {
  type: typeof SET_ERROR_MESSAG_AUTH,
  messag: string
}


export type IauthReducerActions = Iauth|IsetAuthErrorMessag|
                                  IlogOutUser|IsetUserClient|
                                  IsetUser|IresetUser

export default interface IauthReducerState {
  isAuth: boolean
  errorMessag?: string
}