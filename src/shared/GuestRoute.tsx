import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const GuestRoute = () => {
    const { user } = useAuth();

    return <>{user ? <Navigate to={'/'} /> : <Outlet />}</>;
};

export default GuestRoute;