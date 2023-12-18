import React from 'react';


interface UserContainerProps {
    userData: {
        "user_id": 0,
        "user_email": string,
        "user_firstname": string,
        "user_lastname": string,
        "user_status": string,
        "user_city": string,
        "user_phone": string,
        "user_department":string,
        "user_birthdate": string
    }
}


const UserContainer: React.FC<UserContainerProps> = ({userData}:UserContainerProps) => {

    const dateObject: Date = new Date(userData.user_birthdate);

    const formattedDate: string = `${dateObject.getUTCDate()}-${dateObject.getUTCMonth() + 1}-${dateObject.getUTCFullYear()}`;
    return (
        <div className="user-profile-container">
            <div>
                <h2>{userData.user_firstname} {userData.user_lastname}</h2>
                <p>Department: {userData.user_department}</p>
                <p>Location: {userData.user_city}</p>
                <p>Contacts: {userData.user_phone}</p>
                <p>Bithday: {formattedDate}</p>
            </div>
        </div>

    );
};

export default UserContainer;