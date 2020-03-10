export interface IregistrationData {
  password: string
  email: string
  firstName: string
  surname: string
  date: string
  gender: string
}
export interface IloginData {
  login: string
  password: string
}

export enum resultCodeInfo {
  sicces = 0,
  error = 1
}
export interface IerrorRequest {
  resultCode: resultCodeInfo.error
  messages: string
}
export interface IsuccesRequest<R> {
  resultCode: resultCodeInfo.sicces
  data?: R
}


export type IdefaultRequest<R=void> = IerrorRequest | IsuccesRequest<R>