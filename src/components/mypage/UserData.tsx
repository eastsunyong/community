import React from 'react'
import { useNavigate } from 'react-router-dom';
import InfoBox from './InfoBox';
import { auth } from '@/firebase';

const UserData = ({ userData, userId, loading }: any) => {
    const nav = useNavigate()

    return (
        <div className='w-5/12 h-screen bg-gray'>
            {loading && <p>Loading...</p>}
            <div className='flex flex-row justify-between px-20 pt-12 bg-orange'>
                <img
                    className='w-44 h-44 object-cover rounded-full'
                    src={`${userData.profileImage ? userData.profileImage : '/userDefalt.jpg'}`}
                />
                <div className='flex flex-row items-center gap-6'>
                    <InfoBox num={12} info={'팔로잉'} />
                    <InfoBox num={12} info={'팔로워'} />
                    <InfoBox num={12} info={'게시물'} />
                </div>
            </div>
            <div className='px-20 pt-3 font-bold text-m flex justify-between mt-5 items-center'>
                <p>{userData.nickname}</p>
                {/* 조건부 렌더링 */}
                {userData.uid === auth.currentUser?.uid && (
                    <button onClick={() => nav(`/edit/${userId}`)} className='bg-orange w-32'>
                        프로필 수정
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserData