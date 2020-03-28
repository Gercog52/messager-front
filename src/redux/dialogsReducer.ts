import { IdialogsReducerThunk, 
         Imessag,
         IaddMessagDialog, 
         ADD_MESSAG_DIALOG, 
         IdialogsReducerState,
         IdialogsReducerActions,
         IremoveDialogs,
         REMOVE_DIALOGS
       } from "./dialogsReducerType";

export const addMessagInDialog = (idRoom: string, nameRoom: string, message: Imessag): IaddMessagDialog => {
  return {
    type: ADD_MESSAG_DIALOG,
    idRoom,
    message,
    nameRoom
  }
}
export const removeDialogs = ():IremoveDialogs => {
  return {
    type: REMOVE_DIALOGS
  }
}

export const dialogsConnectThunk = ():IdialogsReducerThunk<Promise<void>> => (dispatch,getState) => {
  return new Promise ((res,req) => {
    let userClient = getState().userInfo.userClient;
    if (userClient) {
      let FullPromisRoom: Array<Promise<void>> = [];
      // delete later
      if (!userClient.rooms) {
        userClient.rooms = []
      }
      ///
      userClient.rooms.forEach((roomInfo: any) => {
        FullPromisRoom.push(userClient.subscribeToRoomMultipart({
          roomId: roomInfo.id,
          hooks: {
            onMessage: (message: any) => {
              const userMessag: Imessag = {
                createdAt: message.createdAt,
                id: message.id,
                senderId: message.senderId,
                message: message.parts[0].payload.content
              }
              dispatch(addMessagInDialog(roomInfo.id,roomInfo.name,userMessag));
            }
          }
        }))
      });
      Promise.all(FullPromisRoom).then(() => res());
    }
  })
}
export const dialogsSendMessagThunk = (idRoom: string, message: string):IdialogsReducerThunk<Promise<void>> => async (dispatch,getState) => {
  const userClient = getState().userInfo.userClient
  if (userClient) {
    return userClient.sendSimpleMessage({
      text: message,
      roomId: idRoom
    })
  } 
}

const startState: IdialogsReducerState = {
  rooms: {}
}

export default function dialogsReducer (state=startState, actions: IdialogsReducerActions):IdialogsReducerState {
  switch (actions.type) {
    case ADD_MESSAG_DIALOG: {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [actions.idRoom]: {
            idRoom: actions.idRoom,
            nameRoom: actions.nameRoom,
            dialogs: [...(state.rooms[actions.idRoom]) ? state.rooms[actions.idRoom].dialogs : [], actions.message]
          }
        }
      }
    }
    case REMOVE_DIALOGS: {
      return {
        ...state,
        rooms: {},
      }
    }
    default: return state
  }
}
/*currentUser.subscribeToRoomMultipart({
        roomId: currentUser.rooms[0].id,
        hooks: {
          onMessage: (message:any) => {
            console.log("Received message:", message.parts[0].payload.content)
          }
        }
      });*/