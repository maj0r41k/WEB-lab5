import React, { useEffect, useState } from 'react';
import './NavBar.css'
import Button from "../utils/Button";
import {Link} from "react-router-dom";
import {RootState, store} from "../store/store";
import { useSelector } from 'react-redux';
import { CurrentUserState } from '../store/reducers/currentUserReducer';

const NavBar: React.FC = () => {

    const [isAuthenticatedLog, setIsAuthenticatedLog] = useState(store.getState().isAuthorised.isAuthorised);
    const [currentUser, setCurrentUSer] = useState<CurrentUserState>(store.getState().currentUser);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setIsAuthenticatedLog(store.getState().isAuthorised.isAuthorised);
            setCurrentUSer(store.getState().currentUser)
        });


        return () => {
            unsubscribe();
        };
    }, [JSON.stringify(currentUser), JSON.stringify(isAuthenticatedLog)]);


    const LogOut =()=>{
        localStorage.removeItem('accessToken');
        window.location.reload();
    }


    return (
        <nav className="nav">
            <Link to="/demo" className="nav-title">LAB5</Link>
            <ul>
                {currentUser.serverData.isSuperUser && 
                <li><Link to="/userList">User List</Link></li>}
            </ul>
            { isAuthenticatedLog
                ?
                <>
                    <Link to='/userProfile'>
                        <Button>Email: {currentUser.serverData.user_email}<br/>
                            name: {currentUser.serverData.user_firstname}</Button>
                    </Link>
                    <Button onClick={()=>LogOut()}>Log out</Button>
                </>

                : <div>
                    <Link to='/userRegistration'>
                        <Button>Sign up</Button>
                    </Link>

                    <Link to='/userAuthorization'>
                        <Button>Log in </Button>
                    </Link>
                </div>
            }
        </nav>
    );
};

export default NavBar;