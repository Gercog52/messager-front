export const AUTH_USER = 'AUTH_USER'
export const SET_ERROR_MESSAG_AUTH = 'SET_ERROR_MESSAG_AUTH' 

export interface Iauth {
  type: typeof AUTH_USER
  login: string
  email: string
}
export interface IsetAuthErrorMessag {
  type: typeof SET_ERROR_MESSAG_AUTH,
  messag: string
}
export interface IuserInfo {
  login: string
  email: string
}

export type IauthReducerActions = Iauth|IsetAuthErrorMessag

export default interface IauthReducerState {
  isAuth: boolean
  login?: string
  email?: string
  errorMessag?: string
}