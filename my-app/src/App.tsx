import React, {useEffect, useState} from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import Mock from "./components/Mock";
import UserList from "./pages/UserList";
import UserRegistration from "./pages/UserRegistration";
import { Route, Routes, Navigate } from "react-router-dom"
import UserAuthorization from "./pages/UserAuthorization";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import {RootState, store} from "./store/store";
import {getTokenFromLocalStorage} from "./utils/authorizaton";
import {authTrue, checkAuth} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";
import { CurrentUserState } from './store/reducers/currentUserReducer';



function App() {
    const [isAuthenticatedLog, setIsAuthenticatedLog] = useState(store.getState().isAuthorised.isAuthorised);
    const [currentUser, setCurrentUSer] = useState<CurrentUserState>(store.getState().currentUser);

    const dispatch = useDispatch()
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setIsAuthenticatedLog(store.getState().isAuthorised.isAuthorised);
            setCurrentUSer(store.getState().currentUser)
        });

        return () => {
            unsubscribe();
        };
    }, [JSON.stringify(currentUser), JSON.stringify(isAuthenticatedLog)]);

    const afterUpdate = async () =>{
        const token = getTokenFromLocalStorage()
        if (token && !isAuthenticatedLog){
            await checkAuth(token)
            store.dispatch(authTrue())
        }
    }

    


    afterUpdate()

    return (

        <Mock >
            {isAuthenticatedLog 
                ?
                    (<Routes>
                        <Route path="/meduzzen-demo" element={<MainPage />}/>
                        {currentUser.serverData.isSuperUser &&
                             <Route path="/userList" element={ <UserList/>}/>
                        }
                       
                        <Route path="/userProfile" element={ <UserProfile/>}/>
                        {/* <Route path="/404" element={ <NotFound/>}/>
                        <Route path="/*" element={ <Navigate to="/meduzzen-demo"/>}/> */}
                    </Routes>)
                    :
                    (<Routes>
                        <Route path="/meduzzen-demo" element={<MainPage />}/>
                        <Route path="/userRegistration" element={ <UserRegistration/>}/>
                        <Route path="/userAuthorization" element={ <UserAuthorization/>}/>
                        {/* <Route path="/404" element={ <NotFound/>}/>
                        <Route path="/*" element={ <Navigate to="/meduzzen-demo"/>}/> */}
                    </Routes>)
            }

      </Mock>);
}

export default App;
