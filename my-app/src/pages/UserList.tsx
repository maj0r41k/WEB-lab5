import React, { useEffect, useState } from 'react';
import './UserList.css'
import UserItem from "../components/UserItem";
import { getUserList } from '../store/actions';

export type userFromList = {
    "user_id": 0,
    "user_email": "string",
    "user_firstname": "string",
    "user_lastname": "string"
}

const UserList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userList, setUserList] = useState<userFromList[]>([])
    
    if (userList.length === 0){
        getUserList().then((res )=> {
            setUserList(res.result.users)
        })
    }
    
    useEffect(()=>{
        console.log(userList.length)
        setIsLoading(true)

    }, [userList.length])
    
    const users = userList.map((item) =><UserItem userData ={item} key={item.user_id}/>)

    return (
        <div>
            <h3 className="user-list-heading">User List</h3>
            {isLoading &&
            <div className="user-list-container">
            {users}
        </div>
            }
            
        </div>

    );
};

export default UserList;