export const AUTH_USER = 'AUTH_USER'
export const SET_ERROR_MESSAG_AUTH = 'SET_ERROR_MESSAG_AUTH'
export const LOG_OUT_USER = 'LOG_OUT_USER' 

export interface IuserInfo {
  firstName: string
  surname: string
  email: string
  date: string
  gender: string
}

export interface Iauth extends IuserInfo {
  type: typeof AUTH_USER
}
export interface IlogOutUser {
  type: typeof LOG_OUT_USER
}
export interface IsetAuthErrorMessag {
  type: typeof SET_ERROR_MESSAG_AUTH,
  messag: string
}

export type IauthReducerActions = Iauth|IsetAuthErrorMessag|IlogOutUser

export default interface IauthReducerState {
  isAuth: boolean
  userInfo?: IuserInfo
  errorMessag?: string
}