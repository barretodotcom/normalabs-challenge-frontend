import { AxiosError } from "axios";
import { parseISO } from "date-fns";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, API_URL } from "../services/api";
import { ICreateOwner, IOwner, OwnerService } from "../services/OwnerService";
import { ICreatePaycheck, PaycheckService } from "../services/PaycheckService";
import { ICreateServiceDesk, IDeleteServiceDesk, ServiceDesk } from "../services/ServiceDesk";
import { ISession, ISignUpUser, UserService } from "../services/UserService";
import { isBetween } from "../validators/dateIsBetween";

interface IUser {
    user: any;
    signIn: ({ email, password }: ISession) => Promise<void>;
    signUp: ({ name, email, password, position, accountNumber, cpf, formData }: ISignUpUser) => Promise<void>;
    signOut: () => void;
    findAllUsers: () => Promise<void>;
    avatar: any;
    users: any[] | undefined;
    serviceDesk: object[] | undefined;
    error: string | undefined;
    loading: boolean;
    sucessMessage: string | undefined;
    createServiceDesk: ({ title, details, initialDate, finalDate }: ICreateServiceDesk) => Promise<void>;
    deleteServiceDesk: ({ serviceDeskId, reason }: IDeleteServiceDesk) => Promise<void>;
    createPaycheck: ({ companyName, socialReason, cnpj, extraTime, accountNumber, userId }: ICreatePaycheck) => Promise<void>;
    createOwner: ({ newEmail, newPassword }: ICreateOwner) => Promise<void>;
    signInOwner: ({ email, password }: IOwner) => Promise<void>;
    setTaskStatus: (taskId: string, status: string) => Promise<void>;
    paychecks: object[] | undefined;
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
    const [users, setUsers] = useState<any[] | undefined>();

    useEffect(() => {
        async function refreshUserDatas() {
            const user = JSON.parse(localStorage.getItem("user") as string);
            const token = localStorage.getItem("token");
            const userType = localStorage.getItem("type");

            if (user && token && userType != "owner") {
                api.defaults.headers.common['authorization'] = `Bearer ${token}`;
                setUser(user);
                setToken(token);
                setAvatar(`${API_URL}/files/${user.avatar}`);
                setPaychecks(user.paycheck)
                await refreshServiceDesk(user.id)
                return;
            }

            setLoading(false);
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
            localStorage.setItem('type', 'user')
            api.defaults.headers.common.authorization = `Bearer ${response.data.token}`
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
            localStorage.setItem('type', 'user')

            setUser(user);
            setAvatar(`${API_URL}/files/${user.avatar}`);
            api.defaults.headers.common.authorization = `Bearer ${response.data.token}`;
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
            location.reload();
            setTimeout(() => {
                setSucessMessage(undefined)
            }, 2000);
        } catch (err: any) {
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
            setError("Erro interno! Estamos trabalhando nisso.");
        }
    }

    async function createOwner({ newEmail, newPassword }: ICreateOwner) {
        setError(undefined);
        try {
            const response = await OwnerService.create({ newEmail, newPassword });
            const user = response.data.owner;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('type', 'owner')
            setUser(user);
            api.defaults.headers.common.authorization = `Bearer ${response.data.token}`;
            navigate("/launch-paychecks");
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            setError("Erro interno! Estamos trabalhando nisso.")
        }
    }

    async function signInOwner({ email, password }: IOwner) {
        setError(undefined);
        try {
            const response = await OwnerService.session({ email, password });
            const user = response.data.owner;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem("type", "owner")
            setUser(user);

            api.defaults.headers.common.authorization = `Bearer ${response.data.token}`;
            navigate("/launch-paychecks");


        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            setError("Erro interno! Estamos trabalhando nisso.")
        }
    }

    async function findAllUsers() {
        try {
            const response = await UserService.findAll();
            setUsers(response.data);
            navigate("/launch-paychecks");
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            setError("Erro interno! Estamos trabalhando nisso.")
        }
    }

    async function createPaycheck({ companyName, socialReason, cnpj, extraTime, accountNumber, userId }: ICreatePaycheck) {
        setError(undefined);
        try {
            const response = await PaycheckService.create({ companyName, socialReason, cnpj, extraTime, accountNumber, userId });
            setSucessMessage("Contra cheque emitido com sucesso.");
            setTimeout(() => {
                setSucessMessage(undefined)
            }, 2000);
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            setError("Ocorreu um erro interno, estamos trabalhando nisso!");
        }
    }

    async function setTaskStatus(tasdkId: any, status: string): Promise<void> {
        try {
            const response = await ServiceDesk.updateStatus(tasdkId, status);
            setSucessMessage("Tarefa atualizada com sucesso.");
            location.reload();
            setTimeout(() => {
                setSucessMessage(undefined)
            }, 2000);
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
            setError("Erro interno, estamos trabalhando nisso!");

        }
    }
    return (
        <AuthContext.Provider value={{ loading, user: user, avatar, signIn, signUp, signOut, signInOwner, setTaskStatus, createOwner, createPaycheck, createServiceDesk, deleteServiceDesk, findAllUsers, users, error, serviceDesk, sucessMessage, paychecks }}>
            {children}
        </AuthContext.Provider>
    )

}