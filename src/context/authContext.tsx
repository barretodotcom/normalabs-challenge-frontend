import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { ISession, ISignUpUser, UserService } from "../services/UserService";

interface IUser {
    user: any;
    signIn: ({ email, password }: ISession) => Promise<void>;
    loginError: string | undefined;
}

export const AuthContext = createContext({} as IUser);

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
            api.defaults.headers.common['authorization'] = `Bearer ${token}`;
            setUser(user);
        }
    })

    const [user, setUser] = useState<any>();
    const [loginError, setLoginError] = useState<string>();

    async function signIn({ email, password }: ISession) {
        try {
            const response = await UserService.signIn({ email, password });

        } catch (err: any) {
            if (err.response) {
                setLoginError(err.response.data.message);
                return;
            }
            console.log(err.response);
            setLoginError("Erro interno, estamos trabalhando nisso!");
        }

    }

    async function signUp({ name, email, password, position, accountNumber, cpf }: ISignUpUser) {
        try {
            const response = await UserService.signUp({ name, email, password, position, accountNumber, cpf });
            console.log(response.data);
        } catch (err: any) {
            if (err.response) {
                console.log(err)
            }
        }
    }

    return (
        <AuthContext.Provider value={{ user, signIn, loginError }}>
            {children}
        </AuthContext.Provider>
    )

}