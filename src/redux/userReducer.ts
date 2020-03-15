import {IuserReducerState, 
        IuserReducerActions,
        IuserInfo, 
        IsetUser,
        SET_USER,
        IresetUser,
        RESET_USER,
        IsetUserClient,
        SET_USER_CLIENT,
        IuserReducerThunk,
} from "./userReducerType";
import { dialogsConnectThunk, removeDialogs } from "./dialogsReducer";

export const setUser = (data: IuserInfo, client: any):IsetUser => {
  return {
    type: SET_USER,
    userInfo: data,
    client
  }
}
export const resetUser = ():IresetUser => {
  return {
    type: RESET_USER
  }
}
export const setUserClient = (client: any):IsetUserClient => {
  return {
    type: SET_USER_CLIENT,
    client,
  }
}
export const setUserThunk = (data: IuserInfo, userClient: any):IuserReducerThunk<Promise<void>> => 
  async (dispatch) => {
    dispatch(setUser(data,userClient));
    await dispatch(dialogsConnectThunk());
}
export const resetUserThunk = (): IuserReducerThunk<void> => (dispatch) => {
  dispatch(removeDialogs());
  dispatch(resetUser());
}

const StartState: IuserReducerState = {}

export default function UserReducer (state=StartState, actions: IuserReducerActions):IuserReducerState {
  switch (actions.type) {
    case SET_USER:
      return {
        ...state,
        userInfo: {
          ...actions.userInfo
        },
        userClient: actions.client
      }
    case RESET_USER: 
      return {}
    case SET_USER_CLIENT: 
      return {
        ...state,
        userClient: actions.client
      }
    default:
      return state
  }
}