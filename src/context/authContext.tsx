import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, API_URL } from "../services/api";
import { ICreateServiceDesk, IDeleteServiceDesk, ServiceDesk } from "../services/ServiceDesk";
import { ISession, ISignUpUser, UserService } from "../services/UserService";

interface IUser {
    user: any;
    signIn: ({ email, password }: ISession) => Promise<void>;
    signUp: ({ name, email, password, position, accountNumber, cpf, formData }: ISignUpUser) => Promise<void>;
    signOut: () => void;
    avatar: any;
    serviceDesk: object[] | undefined;
    error: string | undefined;
    loading: boolean;
    sucessMessage: string | undefined;
    createServiceDesk: ({ title, details, initialDate, finalDate }: ICreateServiceDesk) => Promise<void>;
    deleteServiceDesk: ({ serviceDeskId, reason }: IDeleteServiceDesk) => Promise<void>
}

export const AuthContext = createContext({} as IUser);

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const [avatar, setAvatar] = useState<any>();
    const [token, setToken] = useState<string | undefined>();
    const [error, setError] = useState<string>();
    const [sucessMessage, setSucessMessage] = useState<string>();
    const [serviceDesk, setServiceDesk] = useState<object[] | undefined>();
    const [paychecks, setPaychecks] = useState<object[] | undefined>();

    useEffect(() => {
        async function refreshUserDatas() {
            const user = JSON.parse(localStorage.getItem("user") as string);
            const token = localStorage.getItem("token");

            if (user && token) {
                api.defaults.headers.common['authorization'] = `Bearer ${token}`;
                setUser(user);
                setToken(token);
                setAvatar(`${API_URL}/files/${user.avatar}`);
                await refreshServiceDesk(user.id)
                return;
            }
            navigate("/")
        }
        refreshUserDatas();
    }, [])

    async function signIn({ email, password }: ISession) {
        setLoading(true);
        setError(undefined);

        try {
            const response = await UserService.signIn({ email, password });

            const user = response.data.user

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", response.data.token);
            setUser(user);
            setAvatar(`${API_URL}/files/${user.avatar}`);
            setServiceDesk(user.serviceDesk);
            navigate('/profile');
        } catch (err: any) {
            setError(undefined);
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            setError("Erro interno, estamos trabalhando nisso!");
        }
        finally {
            setLoading(false);
        }

    }

    async function signUp({ name, email, password, position, accountNumber, cpf, formData }: ISignUpUser) {
        setLoading(true);
        setError(undefined);
        try {
            const response = await UserService.signUp({ name, email, password, position, accountNumber, cpf, formData });
            const user = response.data.user;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', response.data.token);
            setUser(user);
            setAvatar(`${API_URL}/files/${user.avatar}`);
            api.defaults.headers.common.authorization = `Bearer ${'token'}`;
            navigate('/profile');

        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            setError("Erro interno! Estamos trabalhando nisso.")
        } finally {
            setLoading(false);
        }
    }

    function signOut(): void {
        localStorage.clear();
        setUser(undefined);
        setToken(undefined);
        navigate("/");
    }

    async function createServiceDesk({ title, details, initialDate, finalDate }: ICreateServiceDesk): Promise<void> {
        setError(undefined)
        try {
            const response = await ServiceDesk.create({ title, details, initialDate, finalDate });
            setServiceDesk(response.data.user.serviceDesk);
            setSucessMessage("Tarefa criada com sucesso.");
            setTimeout(() => {
                setSucessMessage(undefined)
            }, 2000);
        } catch (err: any) {
            console.log(err)
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            setError("Erro interno, estamos trabalhando nisso!")
        }

    }

    async function deleteServiceDesk({ serviceDeskId, reason }: IDeleteServiceDesk): Promise<void> {

        try {
            const response = await ServiceDesk.delete({ serviceDeskId, reason });
            setSucessMessage(response.data.message);
            await refreshServiceDesk(user.id);
            setTimeout(() => {
                setSucessMessage(undefined)
            }, 2000);
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            setError("Erro interno! Estamos trabalhando nisso.")
        }
    }

    async function refreshServiceDesk(userId: string) {
        try {
            const response = await UserService.findUserById(userId);
            setServiceDesk(response.data.serviceDesk);
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            console.log(err)
            setError("Erro interno! Estamos trabalhando nisso.");
        }
    }

    return (
        <AuthContext.Provider value={{ loading, user: user, avatar, signIn, signUp, signOut, createServiceDesk, deleteServiceDesk, error, serviceDesk, sucessMessage }}>
            {children}
        </AuthContext.Provider>
    )

}