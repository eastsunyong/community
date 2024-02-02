import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home, SignIn, LogIn, MyPage, Edit } from '@/page';
import PrivateRouter from './PrivateRouter';
import GuestRoute from './GuestRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<GuestRoute />}>
                    <Route path="/signup" element={<SignIn />} />
                    <Route path="/login" element={<LogIn />} />
                </Route>
                <Route element={<PrivateRouter />}>
                    <Route path="/mypage/:userId" element={<MyPage />} />
                    <Route path="/edit/:userId" element={<Edit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;