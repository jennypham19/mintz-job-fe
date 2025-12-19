export interface PaginatedResponse<T>{
    data: T[];
    totalPages: number;
    currentPage: number;
    total: number;
}

export interface GetParams {
    page: number,
    limit: number,
    searchTerm?: string,
    status?: string
}

export interface GetParamsAccount {
    page: number,
    limit: number,
    role?: string
    searchTerm?: string,
}