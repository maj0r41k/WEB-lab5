import React, {useState} from 'react';
import Input from "../utils/Input";
import {toast} from "react-toastify";
import Button from "../utils/Button";
import {authTrue} from "../store/actions";
import {
    validUserAuthorization,
} from "../utils/authorizaton";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

interface User {
    user_email: string;
    user_password: string;
}

const UserAuthorization: React.FC = () => {
    const [user, setUser] = useState<User>({
            user_email: '',
            user_password: '',
        }
    )
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setUser({...user, [event.target.name]: value});
    }

    const authorisationFields = [
        {
            name: 'user_email',
            id: '0',
            value: 'email',
            fun: handleInputChange,
            type: 'email'
        },
        {
            name: 'user_password',
            id: '1',
            value: 'password',
            fun: handleInputChange,
            type: 'password',
        }]


    const fields = authorisationFields.map((item) => (
        <Input
            name={item.name}
            key={item.id}
            label={item.value}
            value={item.value}
            onChange={item.fun}
            id={item.id}
            type={item.type}
        />
    ));

    const logIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (! await validUserAuthorization(user)){
            toast.error('Authorisation failed!', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return
        }
        toast.success('Welcome!', {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        dispatch(authTrue())
        navigate("/userProfile")
    };


    return (
        <div className="input-container">
            <h2>Log in</h2>
            <form>
                {fields}
                <Button onClick={logIn}>Submit</Button>
            </form>
        </div>
    );
};

export default UserAuthorization;