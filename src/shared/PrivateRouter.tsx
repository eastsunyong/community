import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouterProps {
    isAuthenticated: boolean;
    children?: React.ReactNode;
}

const PrivateRouter = ({ isAuthenticated }: PrivateRouterProps) => {
    return <>{isAuthenticated ? <Outlet /> : <Navigate to={'/'} />}</>;
};

export default PrivateRouter;