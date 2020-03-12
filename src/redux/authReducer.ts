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
// @ts-ignore
import {TokenProvider, ChatManager } from '@pusher/chatkit-client';

const tokenProvider = new TokenProvider({
  url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a9d9709b-04d0-4081-8b0b-ec13b23dce26/token',
});
const chatManager = new ChatManager({
  instanceLocator: "v1:us1:a9d9709b-04d0-4081-8b0b-ec13b23dce26",
  userId: "valera",
  tokenProvider: tokenProvider
});
chatManager
  .connect()
  .then((currentUser: any) => {
    console.log("Connected as user ", currentUser);
    currentUser.subscribeToRoomMultipart({
      roomId: currentUser.rooms[0].id,
      hooks: {
        onMessage: (message:any) => {
          console.log("Received message:", message.parts[0].payload.content)
        }
      }
    });
  })

type IauthThunk<R> = MyCastomThunk<R,IauthReducerActions>

const auth = (data: IuserInfo): Iauth => {
  return {
    type: AUTH_USER,
    firstName: data.firstName,
    surname: data.surname,
    email: data.email,
    date: data.date,
    gender: data.gender
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
    dispatch(setAuthErrorMessag(infoRegistration.messag))
  }
};
export const loginThunk = (data: IloginData): IauthThunk<Promise<void>> => async(dispatch) => {
  let infoLogin = await loginRequest(data);
  if (infoLogin.resultCode === resultCodeInfo.sicces && infoLogin.data) {
    dispatch(auth(infoLogin.data))
  } else if (infoLogin.resultCode === resultCodeInfo.error) {
    dispatch(setAuthErrorMessag(infoLogin.messag))
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
        userInfo: {
          firstName: actions.firstName,
          surname: actions.surname,
          gender: actions.gender,
          email: actions.email,
          date: actions.date
        },
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
        isAuth: false,
        errorMessag: undefined,
        userInfo: undefined
      }
    }
    default:
      return state
  }
}