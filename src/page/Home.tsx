import { logout } from "@/api/authApi";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const nav = useNavigate();
    return (
        <div className='w-full h-screen bg-gray'>
            <p onClick={logout}>로그아웃</p>
            <p onClick={() => { nav('/login') }}>로그인</p>
            <p onClick={() => { nav('/signup') }}>회원가입</p>
            <p onClick={() => { nav(`/mypage/${auth.currentUser?.uid}`) }}>마이페이지</p>
        </div>
    );
};

export default Home;
