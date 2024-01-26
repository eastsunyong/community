import { LogIn, SignIn, Home, SignIn2 } from '@/page'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<SignIn />} />
                <Route path="/signin" element={<SignIn2 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router