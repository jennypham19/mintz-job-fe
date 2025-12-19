export const CategoryNews = {
    EVENT : '1',           
    ARCHITECTURE : '2',
    LIFE: '3',
    INFORMATION_TECH: '4',                      
}

export type CategoryNews = typeof CategoryNews[keyof typeof CategoryNews];

export const CATEGORY_LABELS: { [key in CategoryNews]: string} = {
    [CategoryNews.EVENT]: "SỰ KIỆN",
    [CategoryNews.ARCHITECTURE]: "KIẾN TRÚC",
    [CategoryNews.LIFE]: "ĐỜI SỐNG",
    [CategoryNews.INFORMATION_TECH]: "CÔNG NGHỆ",
}

export const RoleUser = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    CANDIDATE: 'candidate',
    RECRUITER: 'recruiter'
}

export type RoleUser = typeof RoleUser[keyof typeof RoleUser];
export const ROLE_LABELS: { [key in RoleUser]: string} = {
    [RoleUser.ADMIN]: 'Quản lý cấp cao',
    [RoleUser.EMPLOYEE]: 'Nhân viên kiểm soát',
    [RoleUser.CANDIDATE]: 'Ứng viên',
    [RoleUser.RECRUITER]: 'Người tuyển dụng'
}

export const GenderUser = {
    FEMALE: 'female',
    MALE: 'male',
    OTHER: 'other',
}

export type GenderUser = typeof GenderUser[keyof typeof GenderUser];
export const GENDER_LABELS: { [key in GenderUser]: string} = {
    [GenderUser.FEMALE]: 'Nữ',
    [GenderUser.MALE]: 'Nam',
    [GenderUser.OTHER]: 'Khác',
}
