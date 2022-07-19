import { api, API_URL } from "./api";

export interface ICreatePaycheck {
    companyName: string;
    socialReason: string;
    cnpj: string;
    extraTime: number;
    accountNumber: string;
    userId: string;
}

export class PaycheckService {

    static async create({ companyName, socialReason, cnpj, extraTime, accountNumber, userId }: ICreatePaycheck) {
        const response = await api.post(`${API_URL}/paycheck/create/${userId}`, { companyName, socialReason, cnpj, extraTime, accountNumber });

        return response;
    }
}