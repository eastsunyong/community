import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';
import UserData from '@/components/mypage/UserData';
import useFollow from '@/hooks/useFollow';
import { auth } from '@/firebase';

const MyPage = () => {
    const { userId } = useParams() as { userId: string };
    const { myUserData, otherUserData } = useUserData(userId);
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    const [isFollowing, toggleFollow] = useFollow(userId);

    useEffect(() => {
        setIsCurrentUser(auth.currentUser?.uid === userId);
    }, [userId]);

    return (
        <div className='w-full h-screen bg-blue flex items-center justify-center'>
            {isCurrentUser ? (
                <UserData userData={myUserData} userId={userId} />
            ) : (
                <UserData userData={otherUserData} userId={userId} />
            )}
            {!isCurrentUser && (
                <button onClick={() => toggleFollow()}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            )}
        </div>
    );
};

export default MyPage;