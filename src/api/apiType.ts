export interface IregistrationData {
  login: string
  email: string
  password: string
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
  messages: string[]
}
export interface IsuccesRequest<R> {
  resultCode: resultCodeInfo.sicces
  data?: R
}


export type IdefaultRequest<R=void> = IerrorRequest | IsuccesRequest<R>