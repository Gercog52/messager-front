import {createStore, combineReducers, applyMiddleware, compose, Action} from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import authReducer from './authReducer';
import usersReducer from './userReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const redusers = combineReducers ({
  authData: authReducer,
  userInfo: usersReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type IRootState = ReturnType<typeof redusers>;
export type IMyCastomThunk<R, CastomActions extends Action> = ThunkAction<R, IRootState, any, CastomActions>
export type IDispatch = ThunkDispatch<IRootState, any, Action>

export default store;