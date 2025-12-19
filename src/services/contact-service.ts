import { HttpResponse } from "@/types/common";
import { IInformation } from "@/types/contact-types";
import HttpClient from "@/utils/HttpClient";
import { GetParams, PaginatedResponse } from "./base-service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/informations`;

interface ProfileDataRequest {
  name: string;
  email: string;
  phone: string;
  captchaCode: string
}

export interface ContactPayload {
  status: number
}

export const sendInformation = (payload: ProfileDataRequest) => {
    const endpoint = `${prefix}/information-send`;
    return HttpClient.post<any>(endpoint, payload);
}

export const getInformations = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IInformation>>> => {
  const url = `${prefix}/list-informations`;
  const params: Record<string, any> = {
    page: getParams.page,
    limit: getParams.limit
  };
  if(getParams.searchTerm && getParams.searchTerm.trim()){
    params.searchTerm = getParams.searchTerm
  }

  if(getParams.status !== 'all'){
    params.status = getParams.status
  };

  const response = await HttpClient.get<{
    success: boolean,
    message: string,
    data: PaginatedResponse<IInformation>
  }>(url, { params });
  if(response.data && response.success && response.data){
    return response
  }else{
    throw new Error(response.message || 'Failed to fetch list informations')
  }
}



