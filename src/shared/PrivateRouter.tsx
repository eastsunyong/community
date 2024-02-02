import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const PrivateRouter = () => {
    const { user } = useAuth();

    return <>{user ? <Outlet /> : <Navigate to={'/'} />}</>;
};

export default PrivateRouter;
