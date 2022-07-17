import { AxiosResponse } from "axios";
import { api, API_URL } from "./api";

export interface ISession {
    email: string | undefined;
    password: string | undefined;
}

export interface ISignUpUser {
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    position: string | undefined;
    accountNumber: string | undefined;
    cpf: string | undefined;
}

export class UserService {
    static async signIn({ email, password }: ISession): Promise<AxiosResponse> {
        console.log(email)
        const response = await api.post(`${API_URL}/session`, { email, password });

        return response;
    }

    static async signUp({ name, email, password, position, accountNumber, cpf }: ISignUpUser) {
        const response = await api.post(`${API_URL}/users/create`, { name, email, password, position, accountNumber, cpf });

        return response;
    }
}