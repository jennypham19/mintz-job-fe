import type { HttpResponse } from '@/types/common';
import { IUser } from '@/types/user';
import HttpClient from '@/utils/HttpClient';
import { GetParamsAccount, PaginatedResponse } from './base-service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/users`;

// Tạo tài khoản

// Lấy ra danh sách tất cả tài khoản, bao gồm (quản trị viên, ứng viên, nhân viên, người truyển dụng)
export const getListAccounts = async(getParams: GetParamsAccount): Promise<HttpResponse<PaginatedResponse<IUser>>> => {
  const url = `${prefix}/list-accounts`;
  const params: Record<string, any> = {
    page: getParams.page,
    limit: getParams.limit
  };
  if(getParams.role !== 'all'){
    params.role = getParams.role
  }

  if(getParams.searchTerm && getParams.searchTerm.trim()){
    params.searchTerm = getParams.searchTerm
  }

  const response = await HttpClient.get<{
    success: boolean,
    message: string,
    data: PaginatedResponse<IUser>
  }>(url, { params });
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list accounts')
  }
}