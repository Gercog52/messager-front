import IauthReducerState, {
  IauthReducerActions,
  IsetAuthErrorMessag,
  SET_ERROR_MESSAG_AUTH,
  IlogOutUser,
  LOG_OUT_USER,
  AUTH_USER,
  Iauth,
} from './authReducerType';
import { IMyCastomThunk } from './store';
import { registrationRequest, loginRequest } from '../api/api';
import { IregistrationData, resultCodeInfo, IloginData} from '../api/apiType';
// @ts-ignore
import {TokenProvider, ChatManager } from '@pusher/chatkit-client';
import {
         setUserThunk,
         resetUser,
} from './userReducer';


type IauthThunk<R> = IMyCastomThunk<R,IauthReducerActions>

const auth = ():Iauth => {
  return {
    type:AUTH_USER    
  }
}
const setAuthErrorMessag = (messag: string): IsetAuthErrorMessag => {
  return {
    type: SET_ERROR_MESSAG_AUTH,
    messag
  }
};
const logOutUser = (): IlogOutUser => {
  return {
    type: LOG_OUT_USER
  }
}
export const registrationThunk = (data: IregistrationData):IauthThunk<Promise<void>> => async(dispatch) => {
  let infoRegistration = await registrationRequest(data);
  if ((infoRegistration.resultCode === resultCodeInfo.sicces) && infoRegistration.data) {
    dispatch(setUserThunk(infoRegistration.data,() => {}));
    dispatch(auth)
  } else if (infoRegistration.resultCode === resultCodeInfo.error) {
    dispatch(setAuthErrorMessag(infoRegistration.messag))
  }
};
export const loginThunk = (data: IloginData): IauthThunk<Promise<void>> => async(dispatch) => {
  let infoLogin = await loginRequest(data);
  if (infoLogin.resultCode === resultCodeInfo.sicces && infoLogin.data) {
    dispatch(setUserThunk(infoLogin.data,() => {}))
    dispatch(auth());
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
    .then((currentUserClient: any) => {
      console.log("Connected as user ", currentUserClient.rooms);
      currentUserClient.subscribeToRoomMultipart({
        roomId: currentUserClient.rooms[0].id,
        hooks: {
          onMessage: (message:any) => {
            console.log("Received message:", message)
          }
        }
      })
      dispatch(setUserThunk({
        firstName: 'anonimus',
        date: '*',
        email: '*',
        gender: '*',
        surname: '*'
      },currentUserClient))
      dispatch(auth());
    })
    .then(() => {
      
    })
}
export const logOutUserThunk = ():IauthThunk<void> => (dispatch) => {
  dispatch(resetUser());
  dispatch(logOutUser());
}

const startState: IauthReducerState = {
  isAuth: false,
};

export default function (state=startState, actions: IauthReducerActions): IauthReducerState {
  switch (actions.type) {
    case AUTH_USER: {
      return {
        ...state,
        isAuth: true
      }
    }
    case SET_ERROR_MESSAG_AUTH: 
      return {
        ...state,
        errorMessag: actions.messag
      }
    case LOG_OUT_USER: {
      return {
        ...state,
        isAuth: false,
      }
    }
    default:
      return state
  }
}