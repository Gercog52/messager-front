import { IMyCastomThunk } from "./store"

export const ADD_MESSAG_DIALOG = 'ADD_MESSAG_DIALOG'

export interface Imessag {
  id: number
  senderId: string
  createdAt: string
}
export type Idialogs = Array<Imessag>
export interface Iroom {
  [roomId: string]: Idialogs
}


export interface IaddMessagDialog {
  type: typeof ADD_MESSAG_DIALOG
  idRoom: string
  messag: Imessag
}

export type IdialogsReducerActions = IaddMessagDialog
export interface IdialogsReducerState {
  rooms: Iroom
}
export type IdialogsReducerThunk<R> = IMyCastomThunk<R,IdialogsReducerActions>
