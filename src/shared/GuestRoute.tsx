import { Navigate, Outlet } from 'react-router-dom';

interface GuestRouteProps {
    isAuthenticated: boolean;
    children?: React.ReactNode;
}

const GuestRoute = ({ isAuthenticated }: GuestRouteProps) => {
    return <>{isAuthenticated ? <Navigate to={'/'} /> : <Outlet />}</>;
};

export default GuestRoute;