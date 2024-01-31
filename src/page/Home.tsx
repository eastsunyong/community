import { logout } from "@/api/authApi";
import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const nav = useNavigate();
    return (
        <div className='w-full h-screen bg-gray'>
            <p onClick={logout}>로그아웃</p>
            <p onClick={() => { nav('/login') }}>로그인</p>
        </div>
    );
};

export default Home;
