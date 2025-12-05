import { GroupPermission } from "./permission";

// src/types/user.ts
export interface IUser {
    id: string,
    email: string,
    fullName: string,
    address: string,
    avatarUrl: string,
    career: string,
    createdAt: string,
    dob: string,
    gender: string,
    nameUrl: string,
    isActived: number,
    isResetPassword: string,
    phone: string,
    role: string,
    updatedAt: string,
    fbLink: string,
    linkedinLink: string,
    permission?: GroupPermission
}

export interface IRole {
    id: number;
    label: string,
    value: string
}

export interface IStatus {
    id: number;
    label: string,
    value: string | number
}


