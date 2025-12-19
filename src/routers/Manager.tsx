import Loadable from "@/components/Loadable";
import { ROUTE_PATH } from "@/constants/routes";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const ManagementHome = Loadable(lazy(() => import('@/views/Manager/Home/index')));
const ManagementAccount = Loadable(lazy(() => import('@/views/Manager/Account/index')));
const ManagementBlog = Loadable(lazy(() => import('@/views/Manager/Blog/index')));
const Profile = Loadable(lazy(() => import('@/views/Manager/Profile/index')));
const ManagementInformation = Loadable(lazy(() => import('@/views/Manager/Information/index')));
const ManagementCV = Loadable(lazy(() => import('@/views/Manager/CV/index')));


const managerRoutes: RouteObject[] = [
  { index: true, element: <Navigate to={ROUTE_PATH.MANAGE_HOME} replace /> },
  { path: ROUTE_PATH.MANAGE_HOME, element: <ManagementHome /> },
  { path: ROUTE_PATH.MANAGE_ACCOUNT, element: <ManagementAccount /> },
  {
    path: ROUTE_PATH.MANAGE_BLOG, 
    element: <ManagementBlog />,
  },
  { path: ROUTE_PATH.MANAGE_INFORMATION, element: <ManagementInformation/>},
  { path: ROUTE_PATH.MANAGE_CV, element: <ManagementCV/>},
  { path: ROUTE_PATH.TO_PROFILE, element: <Profile/>},

];

export default managerRoutes;
