import { LogIn, SignIn, Home, MyPage, Edit } from '@/page'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const Router = () => {
    const isAuthenticated = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={isAuthenticated ? <Home /> : <LogIn />} />
                <Route path="/signup" element={isAuthenticated ? <Home /> : <SignIn />} />
                <Route path="/mypage/:userId" element={isAuthenticated ? <MyPage /> : <LogIn />} />
                <Route path="/:userId/edit" element={isAuthenticated ? <Edit /> : <LogIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router