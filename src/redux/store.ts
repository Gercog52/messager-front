import {createStore, combineReducers, applyMiddleware, compose, Action} from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import authReducer from './authReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const redusers = combineReducers ({
  authData: authReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type RootState = ReturnType<typeof redusers>;
export type MyCastomThunk<R, CastomActions extends Action> = ThunkAction<R, RootState, any, CastomActions>
export type Dispatch = ThunkDispatch<RootState, any, Action>

export default store;