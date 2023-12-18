import React, { useEffect, useState } from 'react';
import './UserProfile.css'
import UserContainer from "../components/UserContainer";
import {store} from "../store/store";
import { CurrentUserState } from '../store/reducers/currentUserReducer';


const UserProfile: React.FC = () => {
    const [currentUser, setCurrentUSer] = useState<CurrentUserState>(store.getState().currentUser);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setCurrentUSer(store.getState().currentUser)
        });
        
        return () => {
            unsubscribe();
        };
    }, [JSON.stringify(currentUser)]);
    
    return (
        <div>
            {currentUser && <UserContainer userData={currentUser.serverData}/>}
        </div>
    )

};

export default UserProfile;