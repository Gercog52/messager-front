import { IMyCastomThunk } from "./store"
import { IremoveDialogs } from "./dialogsReducerType"

export const SET_USER = 'SET_USER' 
export const RESET_USER = 'RESET_USER' 
export const SET_USER_CLIENT = 'SET_USER_CLIENT' 

export interface IuserInfo {
  firstName: string
  surname: string
  email: string
  date: string
  gender: string
}
export interface IsetUser {
  type: typeof SET_USER
  userInfo: IuserInfo
  client: any
}
export interface IresetUser {
  type: typeof RESET_USER
}
export interface IsetUserClient {
  type: typeof SET_USER_CLIENT
  client: any
}

export type IuserReducerActions = IsetUser|IresetUser|
                                  IsetUserClient|IremoveDialogs

export interface IuserReducerState {
  userInfo?: IuserInfo
  userClient?: any
}
export type IuserReducerThunk<R> = IMyCastomThunk<R,IuserReducerActions>