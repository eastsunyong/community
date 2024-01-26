import { LogIn, SignIn, Home, SignIn2 } from '@/page'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const Router = () => {
    const isAuthenticated = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={isAuthenticated ? <Home /> : <LogIn />} />
                <Route path="/register" element={isAuthenticated ? <Home /> : <SignIn />} />
                <Route path="/signin" element={isAuthenticated ? <Home /> : <SignIn2 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router