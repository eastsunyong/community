import { useParams } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';
import UserData from '@/components/mypage/UserData';
import { auth } from '@/firebase';

const MyPage = () => {
    const { userId } = useParams() as { userId: string };
    const { myUserData, otherUserData } = useUserData(userId);

    return (
        <div className='w-full h-screen bg-blue flex items-center justify-center'>
            {auth.currentUser && auth.currentUser.uid === userId ? (
                <UserData userData={myUserData} userId={userId} />
            ) : (
                <UserData userData={otherUserData} userId={userId} />
            )}
        </div>
    );
};

export default MyPage;
