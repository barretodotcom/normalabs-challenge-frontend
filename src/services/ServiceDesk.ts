import { AxiosResponse } from "axios";
import { api, API_URL } from "./api";

export interface ICreateServiceDesk {
    title: string;
    details: string;
    initialDate: Date | string;
    finalDate: Date | string;
}

export class ServiceDesk {
    static async create({ title, details, initialDate, finalDate }: ICreateServiceDesk): Promise<AxiosResponse> {
        const response = await api.post(`${API_URL}/servicesdesks/create`, { title, details, initialDate, finalDate });

        return response;
    }
}