import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';



import managerRoutes from './Manager';
import AuthGuard from '@/components/AuthGuard';
import Loadable from '@/components/Loadable';
import PublicRoute from '@/components/PublicRoute';



import AuthLayout from '@/layouts/Auth/AuthLayout';
import DashboardLayout from '@/layouts/Dashboard';
import LandingPageLayout from '@/layouts/LandingPage';
import ChangePassword from '@/views/Auth/ChangePassword';


const Login = Loadable(lazy(() => import('@/views/Auth/Login')));
const Registration = Loadable(lazy(() => import('@/views/Auth/Registration')));
const Home = Loadable(lazy(() => import('@/views/LandingPage/Home/index')));
const PostLandingPage = Loadable(lazy(() => import('@/views/LandingPage/Post/index')));
const AboutUs = Loadable(lazy(() => import('@/views/LandingPage/AboutUs/index')));
const News = Loadable(lazy(() => import('@/views/LandingPage/News/index')));
const NotFound = Loadable(lazy(() => import('@/views/Errors/NotFound')));
const PermissionDenied = Loadable(lazy(() => import('@/views/Errors/PermissionDenied')));

const routes: RouteObject[] = [
  // --- NHÁNH 1: CÁC TRANG QUẢN LÝ (PRIVATE) ---
  {
    path: '/manage',
    element: <AuthGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: managerRoutes,
      },
    ],
  },
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        element: <LandingPageLayout />,
        children: [
          { path: 'home', element: <Home /> },
          { path: 'about-us', element: <AboutUs /> },
          { path: 'news', element: <News /> },
          { path: 'new-post', element: <PostLandingPage /> },
          { index: true, element: <Navigate to='/home' replace /> },
        ],
      },
    ],
  },

  // --- NHÁNH 2: CÁC TRANG XÁC THỰC (CHỈ DÀNH CHO NGƯỜI CHƯA ĐĂNG NHẬP) ---
  {
    path: '/auth',
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to='login' replace /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Registration /> },
          { path: 'change-password', element: <ChangePassword /> },
        ],
      },
    ],
  },

  // --- NHÁNH 3: CÁC TRANG CÔNG KHAI (LANDING PAGE - DÀNH CHO TẤT CẢ MỌI NGƯỜI) ---
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'news', element: <News /> },
      { path: 'new-post', element: <PostLandingPage /> },
      { index: true, element: <Navigate to='/home' replace /> },
    ],
  },

  // --- NHÁNH 4: CÁC TRANG LỖI ---
  {
    path: '/403',
    element: <PermissionDenied />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;