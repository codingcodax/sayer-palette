import React, { useState, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import History from '../components/History';
import { notifySuccess, notifyError } from '../components/Toastify';

export const AuthContext = createContext();

toast.configure();

const AuthContextProvider = (props) => {
    const [isSignIn, setIsSignIn] = useState(false);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async (e, values) => {
        e.preventDefault();
        setIsLoading(true);
        const { username, password } = values;

        try {
            const params = { username, password };
            const res = await axios.post('/api/users/login', params);
            History.push('/get-color');
            setIsSignIn(true);
            setIsLoading(false);
            setUser({
                username: res.data.username,
                email: res.data.email,
                role: res.data.role,
            });
            notifySuccess('You sign in correctly');
        } catch (error) {
            setIsLoading(false);
            notifyError('Username or password incorrect');
        }
    };

    const register = async (e, values) => {
        e.preventDefault();
        const { name, email, username, password, confirmPassword } = values;

        try {
            const params = {
                name,
                email,
                username,
                password,
                repeat_password: confirmPassword,
            };
            const res = await axios.post('/api/users/register', params);
            History.push('/sign-in');
            notifySuccess('You register correctly');
        } catch (error) {
            notifyError('Please make sure if your credentials are valid');
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isSignIn, isLoading, setIsSignIn, signIn, register }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
