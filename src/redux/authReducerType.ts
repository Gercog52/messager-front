import {IuserInfo} from './UserReducerType';

export const AUTH_USER = 'AUTH_USER'
export const SET_ERROR_MESSAG_AUTH = 'SET_ERROR_MESSAG_AUTH'
export const LOG_OUT_USER = 'LOG_OUT_USER' 
export const SET_CURRENT_USER_CLIENT = 'SET_CURRENT_USER_CLIENT'


export interface IauthUser extends IuserInfo {
  type: typeof AUTH_USER
}
export interface IlogOutUser {
  type: typeof LOG_OUT_USER
}
export interface IsetAuthErrorMessag {
  type: typeof SET_ERROR_MESSAG_AUTH,
  messag: string
}
export interface IsetCurrentUserClient {
  type: typeof SET_CURRENT_USER_CLIENT
  client: any
}

export type IauthReducerActions = IauthUser|IsetAuthErrorMessag|IlogOutUser|
                                  IsetCurrentUserClient

export default interface IauthReducerState {
  currentUserClient?: any
  isAuth: boolean
  userInfo?: IuserInfo
  errorMessag?: string
}