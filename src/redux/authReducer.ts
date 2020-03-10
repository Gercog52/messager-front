import IauthReducerState, { 
  Iauth, 
  AUTH_USER, 
  IauthReducerActions,
  IsetAuthErrorMessag,
  SET_ERROR_MESSAG_AUTH,
  IuserInfo,
  IlogOutUser,
  LOG_OUT_USER
} from './authReducerType';
import { MyCastomThunk } from './store';
import { registrationRequest, loginRequest } from '../api/api';
import { IregistrationData, resultCodeInfo, IloginData} from '../api/apiType';

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
};
export const logOutUser = (): IlogOutUser => {
  return {
    type: LOG_OUT_USER
  }
}

//export const authThunk = ():IauthThunk<Promise<void>> => async(dispatch) => {
//  let info
//};

export const registrationThunk = (data: IregistrationData):IauthThunk<Promise<void>> => async(dispatch) => {
  let infoRegistration = await registrationRequest(data);
  if ((infoRegistration.resultCode === resultCodeInfo.sicces) && infoRegistration.data) {
    dispatch(auth(infoRegistration.data))
  } else if (infoRegistration.resultCode === resultCodeInfo.error) {
    dispatch(setAuthErrorMessag(infoRegistration.messages))
  }
};
export const loginThunk = (data: IloginData): IauthThunk<Promise<void>> => async(dispatch) => {
  let infoLogin = await loginRequest(data);
  if (infoLogin.resultCode === resultCodeInfo.sicces && infoLogin.data) {
    dispatch(auth(infoLogin.data))
  } else if (infoLogin.resultCode === resultCodeInfo.error) {
    dispatch(setAuthErrorMessag(infoLogin.messages))
  }
}

const startState: IauthReducerState = {
  isAuth: false,
};

export default function (state=startState, actions: IauthReducerActions): IauthReducerState {
  switch (actions.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuth: true,
        email: actions.email,
        login: actions.login,
        errorMessag: undefined
      };
    case SET_ERROR_MESSAG_AUTH: 
      return {
        ...state,
        errorMessag: actions.messag
      }
    case LOG_OUT_USER: {
      return {
        ...state,
        login: undefined,
        email: undefined,
        errorMessag: undefined,
        isAuth: false,
      }
    }
    default:
      return state
  }
}