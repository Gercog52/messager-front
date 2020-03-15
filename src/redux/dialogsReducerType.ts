import { IMyCastomThunk } from "./store"

export const ADD_MESSAG_DIALOG = 'ADD_MESSAG_DIALOG'
export const REMOVE_DIALOGS = 'REMOVE_DIALOGS' 

export interface Imessag {
  id: number
  senderId: string
  createdAt: string
  message: string
}
export type Idialogs = Array<Imessag>
export interface Irooms {
  [roomId: string]: {
    nameRoom: string
    dialogs: Idialogs
  }
}

export interface IremoveDialogs {
  type: typeof REMOVE_DIALOGS
}
export interface IaddMessagDialog {
  type: typeof ADD_MESSAG_DIALOG
  idRoom: string
  nameRoom: string
  message: Imessag
}

export type IdialogsReducerActions = IaddMessagDialog|IremoveDialogs
export interface IdialogsReducerState {
  rooms: Irooms
}
export type IdialogsReducerThunk<R> = IMyCastomThunk<R,IdialogsReducerActions>
