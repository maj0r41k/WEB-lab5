import {ReceiveServerDataAction} from "../actions";

export interface CurrentUserState {
    serverData: 
        {
            "user_id": 0,
            "user_email": string,
            "user_firstname": string,
            "user_lastname": string,
            "user_status": string,
            "user_city": string,
            "user_phone": string,
            "user_department":string,
            "user_birthdate": string,
            "isSuperUser": boolean
        }
        
}

export const initialCurrentUserState: CurrentUserState = {
    serverData: {
        "user_id": 0,
        "user_email": '',
        "user_firstname": '',
        "user_lastname": '',
        "user_status": '',
        "user_city": '',
        "user_phone": '',
        "user_department":'',
        "user_birthdate": '',
        isSuperUser: false
    }
};


export function currentUserReducer(state = initialCurrentUserState, action: ReceiveServerDataAction) {
    switch (action.type) {
        case 'RECEIVE_CURRENT_USER':
            return {...state, serverData: action.payload};
        default:
            return state;
    }
}
