import React, { createContext, useCallback, useState } from 'react';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
}


export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initialState);

    const login = async (email, password) => {
        try {
            const resp = await fetchSinToken('login', { email, password }, 'POST');
            localStorage.setItem('token', resp?.message.token);
            const { user } = resp.message;
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.nombre,
                email: user.email
            })
            return true;
        } catch (error) {
            return false;
        }
    }

    const register = async (nombre, email, password) => {
        try {
            const resp = await fetchSinToken('login/new', { nombre, email, password }, 'POST');
            localStorage.setItem('token', resp?.message.token);
            const { usuario } = resp.message;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            })
            return true;
        } catch (error) {
            return false;
        }
    }

    const verificaToken = useCallback(async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })
            return false;
        }

        try {
            const resp = await fetchConToken('login/renew');
            localStorage.setItem('token', resp?.message.token);
            const { user } = resp.message;
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.nombre,
                email: user.email
            })
            return true;
        } catch (error) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })
            return false;
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false,
        })
    }

    return (
        <AuthContext.Provider value={{
            login,
            register,
            verificaToken,
            logout,
            auth
        }}>
            {children}
        </AuthContext.Provider>
    )
}
