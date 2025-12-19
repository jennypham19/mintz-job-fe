// src/layouts/Dashboard/Sidebar/Sections.ts

import type { SvgIconComponent } from '@mui/icons-material';
import { 
  HomeOutlined, 
  PostAdd, 
  ManageAccountsOutlined, 
  Article,
  ManageAccounts
} from '@mui/icons-material';

import { ROUTE_PATH } from '@/constants/routes';
import type { IUser } from '@/types/user';
import { GroupPermission } from '@/types/permission';
import { mapPermissionsToSectionItems } from '@/utils/data';

export interface SectionItem {
  title: string;
  path: string;
  children?: SectionItem[];
  icon?: SvgIconComponent;
}

interface Section {
  section: string | null;
  items: SectionItem[];
}


const Sections = (profile: IUser | null, menuData: GroupPermission | null): Section[] => {
  if (!profile || (profile.role?.toLowerCase().trim() !== 'admin' && !menuData)) {
    return [];
  }

  const sectionItems = menuData ? mapPermissionsToSectionItems(menuData) : [];


  const menuItems: SectionItem[] = [
      {
        title: 'Trang chủ',
        path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined,
      },
      {
        title: 'Quản lý Tài khoản',
        path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_ACCOUNT}`,
        icon: ManageAccountsOutlined,
      },
      {
        title: 'Quản lý Thông tin',
        path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_INFORMATION}`,
        icon: ManageAccounts,
      },
      {
        title: 'Quản lý Bài đăng',
        path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_BLOG}`,
        icon: PostAdd,
      },
      {
        title: 'Quản lý CV',
        path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_CV}`,
        icon: Article,
      },     
    ];

  const isAdmin = profile.role?.toLowerCase().trim() === 'admin';
  // let accountItem: SectionItem[] = isAdmin ? menuItems : sectionItems;
  
  let accountItem: SectionItem[] = menuItems;

  return [
    {
      section: null, 
      items: accountItem,
    }
  ];
};

export default Sections;