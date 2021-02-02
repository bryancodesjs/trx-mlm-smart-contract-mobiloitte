import React, { createContext, useState } from 'react';
import axios from 'axios';
// import ApiConfig from 'src/config/ApiConfig';
export const AuthContext = createContext();

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

function checkLogin() {
    const accessToken = window.localStorage.getItem('accessToken');
    return accessToken ? true : false;
}


export default function AuthProvider(props) {
    const [isLogin, setIsLogin] = useState(checkLogin());
    const [userData, setUserData] = useState({});

    let data = {
        userLoggedIn: isLogin,
        userData,
        userLogIn: (type, data) => {
            setSession(data);
            setIsLogin(type);
        },
    }


    return (
        <AuthContext.Provider value={data}>
            {props.children}
        </AuthContext.Provider>
    )
}