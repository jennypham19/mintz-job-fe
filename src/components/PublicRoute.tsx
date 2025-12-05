import { Navigate, Outlet } from 'react-router-dom';



import { ROLE } from '@/constants/roles';
import { ROUTE_PATH } from '@/constants/routes';
import { useAppSelector } from '@/store';


const PublicRoute = ({  }) => {
  const { isAuthenticated, profile } = useAppSelector((state) => state.auth);
  console.log('isAuthenticated: ', isAuthenticated);
  

  if (isAuthenticated) {
    switch (profile?.role) {
      case ROLE.ADMIN:
        return <Navigate to={`/${ROUTE_PATH.MANAGE}`} replace />;
      case ROLE.CANDIDATE:
        return <Navigate to={`${ROUTE_PATH.HOME}`} />;
      case ROLE.RECRUITER:
        return <Navigate to={`${ROUTE_PATH.HOME}`} />;
      case ROLE.EMPLOYEE:
      default:
        return <Navigate to={`/${ROUTE_PATH.MANAGE}`} replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;