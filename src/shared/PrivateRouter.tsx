import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function PrivateRouter() {
    const isAuthenticated = useAuth();
    console.log(isAuthenticated);

    return <>{isAuthenticated ? <Outlet /> : <Navigate to={'/'} />}</>;
}