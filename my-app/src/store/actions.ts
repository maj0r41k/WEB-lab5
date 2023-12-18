import {ThunkAction} from "redux-thunk";
import {store} from "./store";
import {Dispatch} from "redux";
import {instance} from "../api/api";
import {NewUser} from "../pages/UserRegistration";
import {toast} from "react-toastify";
import {CurrentUserState} from "./reducers/currentUserReducer";
import {ServerState} from "./reducers/serverReducer";

export type Action =
    | { type: 'SERVER_OK', payload: boolean }
    | { type: 'SERVER_FAIL', payload: boolean }
    | { type: "RECEIVE_CURRENT_USER", payload: CurrentUserState }
    | { type: "IS_AUTHORISED_TRUE" }


export interface ReceiveServerDataAction {
    type: 'RECEIVE_CURRENT_USER',
    payload: CurrentUserState
}

export const authTrue = (): Action => ({type: 'IS_AUTHORISED_TRUE'});

export const checkHealth = (): ThunkAction<void, ServerState, unknown, Action> => {
    return (dispatch: Dispatch) => {
        instance
            .get('/')
            .then(function (response) {
                dispatch({
                    type: 'SERVER_OK',
                    payload: true,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: 'SERVER_FAIL',
                    payload: false,
                });
            })
    };
};

export const checkAuth = async (tokenStr: string | null) => {
    console.log("1")
    return await instance
        .get('/auth/me/',
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
        .then(function (response) {
            store.dispatch({
                type: 'RECEIVE_CURRENT_USER',
                payload: response.data.result
            })
            return true;
        })
        .catch(function (error) {
            // toast.error("Failed to authenticate!", {
            //     position: toast.POSITION.BOTTOM_RIGHT
            // })
            return false;
        });

}

export const addUser = async (user: NewUser) => {
    return await instance
        .post("/users/add_user", {
            user_password: user.user_password,
            user_email: user.user_email,
            user_firstname: user.user_firstname,
            user_lastname: user.user_lastname,
            user_city: user.user_city,
            user_department: user.user_department,
            user_phone: user.user_phone,
            user_birthdate: user.user_birthdate,
        })
        .then(function (response) {
            return true;
        })
        .catch(function (error) {
            toast.error("Invalid data!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return false;
        });
}

export const logInUser = async (email: string, password: string) => {
    return await instance
        .post('/auth/login/', {
            user_email: email,
            user_password: password
        })
        .then(function (response) {
            localStorage.setItem('accessToken', response.data.result.access_token);
            return true;
        })
        .catch(function (error) {
            toast.error("Invalid Email or Password!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return false;
        });
}


export const getUserList = async () => {
    return await instance
    .get('/users/')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        toast.error("Can`t get users", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        return false;
    });
}

export const DeleteUsserAction = async(user_id: number) => {
    return await instance
    .delete(`/users/${user_id}`)
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        toast.error("Erroe seleting user", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        return false;
    });
}
