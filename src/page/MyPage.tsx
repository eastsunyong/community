import { useParams } from 'react-router-dom';
import UserData from '@/components/mypage/UserData';
import { useFollow } from '@/hooks/useFollow';

const MyPage = () => {
    const { userId } = useParams() as { userId: string };
    const { userInfo, handleFollowToggle } = useFollow(userId)

    return (
        <div className="w-full h-screen bg-blue flex items-center justify-center">
            <UserData userInfo={userInfo} userId={userId} handleFollowToggle={handleFollowToggle} />
        </div>
    );
};

export default MyPage;