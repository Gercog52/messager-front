import IauthReducerState, { 
  Iauth, 
  AUTH_USER, 
  IauthReducerActions,
  IsetAuthErrorMessag,
  SET_ERROR_MESSAG_AUTH,
  IuserInfo
} from './authReducerType';
import { MyCastomThunk } from './store';
import { registrationRequers } from '../api/api';
import { IregistrationData, resultCodeInfo} from '../api/apiType';

type IauthThunk<R> = MyCastomThunk<R,IauthReducerActions>

const auth = (data: IuserInfo): Iauth => {
  return {
    type: AUTH_USER,
    email: data.email,
    login: data.login
  }
}
const setAuthErrorMessag = (messag: string): IsetAuthErrorMessag => {
  return {
    type: SET_ERROR_MESSAG_AUTH,
    messag
  }
}

export const authThunk = ():IauthThunk<Promise<void>> => async(dispatch) => {
  let info
}
export const registrationThunk = (data: IregistrationData):IauthThunk<Promise<void>> => async(dispatch) => {
  let infoRegistration = await registrationRequers(data);
  if (infoRegistration.resultCode === resultCodeInfo.sicces && infoRegistration.data) {
    dispatch(auth(infoRegistration.data));
  }
}

const startState: IauthReducerState = {
  isAuth: false,
}

export default function (state=startState, actions: IauthReducerActions): IauthReducerState {
  switch (actions.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuth: true,
        email: actions.email,
        login: actions.login
      }
    default:
      return state
  }
}