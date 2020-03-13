import { IdialogsReducerThunk, 
         Imessag,
         IaddMessagDialog, 
         ADD_MESSAG_DIALOG 
       } from "./dialogsReducerType";

export const addMessagInDialog = (idRoom: string, messag: Imessag): IaddMessagDialog => {
  return {
    type: ADD_MESSAG_DIALOG,
    idRoom,
    messag
  }
}

export const dialogsConnectThunk = ():IdialogsReducerThunk<Promise<void>> => (dispatch,getState) => {
  return new Promise ((res,req) => {
    let userClient = getState().userInfo.userClient;
    if (userClient) {
      let FullPromisRoom: Array<Promise<void>> = [];
      userClient.rooms.forEach((roomInfo: any) => {
        FullPromisRoom.push(userClient.subscribeToRoomMultipart({
          roomId: roomInfo.id,
          hooks: {
            onMessage: (message: any) => {
              const userMessag: Imessag = {
                createdAt: message.createdAt,
                id: message.id,
                senderId: message.senderId
              }
              dispatch(addMessagInDialog(roomInfo.id,userMessag));
            }
          }
        }))
      });
      Promise.all(FullPromisRoom).then(() => res());
    }
  })
  
}

export default function dialogsReducer (state: any,action: any) {

}
/*currentUser.subscribeToRoomMultipart({
        roomId: currentUser.rooms[0].id,
        hooks: {
          onMessage: (message:any) => {
            console.log("Received message:", message.parts[0].payload.content)
          }
        }
      });*/