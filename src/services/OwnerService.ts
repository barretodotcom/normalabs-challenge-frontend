import { api, API_URL } from "./api";

export interface IOwner {
    email: string;
    password: string;
}

export interface ICreateOwner {
    newEmail: string;
    newPassword: string;
}

export class OwnerService {
    static async create({ newEmail, newPassword }: ICreateOwner) {

        const email = newEmail;
        const password = newPassword;

        const response = await api.post(`${API_URL}/owner/create`, { email, password });

        return response;
    }

    static async session({ email, password }: IOwner) {
        const response = await api.post(`${API_URL}/owner/session`, { email, password });

        return response;
    }
}