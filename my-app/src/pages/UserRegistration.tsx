import React, {useState} from 'react';
import Input from '../utils/Input';
import './UserRegistration.css';
import Button from '../utils/Button';
import {toast} from "react-toastify";
import {authTrue} from "../store/actions";
import {validUserRegistration} from "../utils/authorizaton";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export interface NewUser {
    user_password: string,
    user_password_repeat: string,
    user_email: string,
    user_firstname: string,
    user_lastname: string,
    user_city: string,
    user_phone: number,
    user_birthdate: string,
    user_department: string
}

const UserRegistration: React.FC = () => {
    const [newUser, setNewUser] = useState<NewUser>({
        user_password: '',
        user_password_repeat: '',
        user_email: '',
        user_firstname: '',
        user_lastname: '',
        user_city: '',
        user_department: '',
        user_phone: 0,
        user_birthdate: '',
    })
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewUser({...newUser, [event.target.name]: value});
    }


    const registrationFields = [
        {
            name: 'user_email',
            id: '0',
            value: 'E-mail',
            fun: handleInputChange,
            type: 'email'
        },
        {
            name: 'user_password',
            id: '1',
            value: 'Password',
            fun: handleInputChange,
            type: 'password',
        },
        {
            name: 'user_password_repeat',
            id: '2',
            value: 'Repeat password',
            fun: handleInputChange,
            type: 'password',
        },
        {
            name: 'user_firstname',
            id: '3',
            value: 'First name',
            fun: handleInputChange,
            type: 'text',
        },
        {
            name: 'user_lastname',
            id: '4',
            value: 'Last name',
            fun: handleInputChange,
            type: 'text',
        },
        {
            name: 'user_city',
            id: '5',
            value: 'City',
            fun: handleInputChange,
            type: 'text',
        },
        {
            name: 'user_department',
            id: '6',
            value: 'Department',
            fun: handleInputChange,
            type: 'text',
        },
        {
            name: 'user_phone',
            id: '7',
            value: 'Phone number',
            fun: handleInputChange,
            type: 'number',
        },
        {
            name: 'user_birthdate',
            id: '8',
            value: 'Birthday',
            fun: handleInputChange,
            type: 'text',
        },
    ];

    const fields = registrationFields.map((item) => (
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


    const register = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (! await validUserRegistration(newUser)){
            toast.error('Registration failed!', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return
        }
        toast.success('Registration done', {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        await dispatch(authTrue())
        await navigate("/userProfile",)
    }

    
    return (
        <div className="input-container">
            <h2>Create account</h2>
            <form>
                {fields}
                <Button onClick={register}>Submit</Button>
            </form>
        </div>
    );
};

export default UserRegistration;
