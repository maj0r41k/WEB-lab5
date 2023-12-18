import React from 'react';
import {Link} from "react-router-dom";
import { userFromList } from '../pages/UserList';
import { Button } from '@mui/material';
import { DeleteUsserAction } from '../store/actions';

interface UserItemProps {
    userData: userFromList;
}

const UserItem : React.FC<UserItemProps>= (props) => {
    const {userData} = props
    const deleteUser = (user_id: number) => {
        DeleteUsserAction(user_id)
        window.location.reload()
    }
    return (
        <div className="user-item-container">
            <div>
                <h4>{userData.user_firstname} {userData.user_lastname}</h4>
                <Button  variant="outlined" color="error" onClick={() => deleteUser(userData.user_id)}>Delete</Button>
            </div>
        </div>
    );
};

export default UserItem;