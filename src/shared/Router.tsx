// Router 컴포넌트
import { LogIn, SignIn, Home, MyPage, Edit } from '@/page'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import PrivateRouter from './PrivateRouter';
import GuestRoute from './GuestRoute';

const Router = () => {
    const isAuthenticated = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<GuestRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/signup" element={<SignIn />} />
                    <Route path="/login" element={<LogIn />} />
                </Route>
                <Route element={<PrivateRouter isAuthenticated={isAuthenticated} />}>
                    <Route path="/mypage/:userId" element={<MyPage />} />
                    <Route path="/edit/:userId" element={<Edit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
