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
    formData: FormData;
}

export class UserService {
    static async signIn({ email, password }: ISession): Promise<AxiosResponse> {
        console.log(email)
        const response = await api.post(`${API_URL}/session`, { email, password });

        return response;
    }

    static async signUp({ name, email, password, position, accountNumber, cpf, formData }: ISignUpUser) {

        const userJson = JSON.stringify({ name, email, password, position, accountNumber, cpf });

        const blob = new Blob([userJson], {
            type: 'application/json'
        });

        formData.append('user', userJson);

        const response = await api.post(`${API_URL}/users/create`, formData);

        return response;
    }

    static async findUserAvatar(avatarFilePath: string) {
        return `${API_URL}/files/${avatarFilePath}`;
    }

    static async findUserById(userId: string) {
        const response = await api.get(`${API_URL}/users/findone/${userId}`);

        return response;
    }

    static async findAll() {
        const response = await api.get(`${API_URL}/users/list`);

        return response;
    }
}