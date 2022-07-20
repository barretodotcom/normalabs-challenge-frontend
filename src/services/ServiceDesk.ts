import { AxiosResponse } from "axios";
import { api, API_URL } from "./api";

export interface ICreateServiceDesk {
    title: string;
    details: string;
    initialDate: Date | string;
    finalDate: Date | string;
}

export interface IDeleteServiceDesk {
    serviceDeskId: string;
    reason: string;
}

export class ServiceDesk {
    static async create({ title, details, initialDate, finalDate }: ICreateServiceDesk): Promise<AxiosResponse> {
        const response = await api.post(`${API_URL}/servicesdesks/create`, { title, details, initialDate, finalDate });

        return response;
    }
    static async delete({ serviceDeskId, reason }: IDeleteServiceDesk) {
        const response = await api.delete(`${API_URL}/servicesdesks/delete/${serviceDeskId}`, {
            data: {
                reason
            }
        });
        return response;
    }

    static async updateStatus(serviceDeskId: string, status: string) {
        const response = await api.patch(`${API_URL}/servicesdesks/status/${serviceDeskId}`, { status });
        console.log(response)
        return response;
    }
}