import IauthReducerState, { 
  IauthUser, 
  AUTH_USER, 
  IauthReducerActions,
  IsetAuthErrorMessag,
  SET_ERROR_MESSAG_AUTH,
  IlogOutUser,
  LOG_OUT_USER,
  IsetCurrentUserClient,
  SET_CURRENT_USER_CLIENT
} from './authReducerType';
import {IuserInfo} from './UserReducerType'
import { IMyCastomThunk } from './store';
import { registrationRequest, loginRequest } from '../api/api';
import { IregistrationData, resultCodeInfo, IloginData} from '../api/apiType';
// @ts-ignore
import {TokenProvider, ChatManager } from '@pusher/chatkit-client';

type IauthThunk<R> = IMyCastomThunk<R,IauthReducerActions>

const authUser = (data: IuserInfo): IauthUser => {
  return {
    type: AUTH_USER,
    firstName: data.firstName,
    surname: data.surname,
    email: data.email,
    date: data.date,
    gender: data.gender
  }
}

const setCurrentUserClient = (client: any):IsetCurrentUserClient => {
  return {
    type: SET_CURRENT_USER_CLIENT,
    client
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
    dispatch(authUser(infoRegistration.data))
  } else if (infoRegistration.resultCode === resultCodeInfo.error) {
    dispatch(setAuthErrorMessag(infoRegistration.messag))
  }
};
export const loginThunk = (data: IloginData): IauthThunk<Promise<void>> => async(dispatch) => {
  let infoLogin = await loginRequest(data);
  if (infoLogin.resultCode === resultCodeInfo.sicces && infoLogin.data) {
    dispatch(authUser(infoLogin.data))
  } else if (infoLogin.resultCode === resultCodeInfo.error) {
    dispatch(setAuthErrorMessag(infoLogin.messag))
  }
}
export const loginAnonimusThunk = (): IauthThunk<Promise<void>> => async(dispatch) => {
  const tokenProvider = new TokenProvider({
    url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a9d9709b-04d0-4081-8b0b-ec13b23dce26/token',
  });
  const chatManager = new ChatManager({
    instanceLocator: "v1:us1:a9d9709b-04d0-4081-8b0b-ec13b23dce26",
    userId: "anonymous",
    tokenProvider: tokenProvider
  });
  chatManager
    .connect()
    .then((currentUser: any) => {
      console.log("Connected as user ", currentUser);
      dispatch(setCurrentUserClient(currentUser));
      currentUser.subscribeToRoomMultipart({
        roomId: currentUser.rooms[0].id,
        hooks: {
          onMessage: (message:any) => {
            console.log("Received message:", message.parts[0].payload.content)
          }
        }
      });
    })
    .then(() => {
      dispatch(authUser({
        firstName: 'anonimus',
        date: '*',
        email: '*',
        gender: '*',
        surname: '*'
      }))
    })
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
    case SET_CURRENT_USER_CLIENT: {
      return {
        ...state,
        currentUserClient: actions.client
      }
    }
    default:
      return state
  }
}