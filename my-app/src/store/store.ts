import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {IsUserAuthorisedState, authReducer} from "./reducers/authReducer";
import {CurrentUserState, currentUserReducer} from "./reducers/currentUserReducer";
import {serverReducer} from "./reducers/serverReducer";

export interface RootState {
    currentUser: CurrentUserState,
    isAuthorised: IsUserAuthorisedState,
}

export const rootReducer = combineReducers({
    server: serverReducer,
    currentUser: currentUserReducer,
    isAuthorised: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
