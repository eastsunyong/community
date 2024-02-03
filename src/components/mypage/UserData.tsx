import { useNavigate } from 'react-router-dom';
import InfoBox from './InfoBox';
import { auth } from '@/firebase';

const UserData = ({ userInfo, userId, handleFollowToggle }: any) => {
  const nav = useNavigate()
  const isFollower = userInfo?.followers?.includes(auth.currentUser?.uid);

  return (
    <div className='w-5/12 h-screen bg-gray'>
      <div className='flex flex-row justify-between px-20 pt-12 bg-orange'>
        <img
          className='w-44 h-44 object-cover rounded-full'
          src={`${userInfo?.profileImage ? userInfo.profileImage : '/userDefalt.jpg'}`}
        />
        <div className='flex flex-row items-center gap-6'>
          <InfoBox num={12} info={'게시물'} />
          <InfoBox num={userInfo?.followers?.length} info={'팔로워'} />
          <InfoBox num={userInfo?.following?.length} info={'팔로우'} />
        </div>
      </div>
      <div className='px-20 pt-3 font-bold text-m flex justify-between mt-5 items-center'>
        <p>{userInfo?.nickname}</p>
        {/* 조건부 렌더링 */}
        {auth.currentUser?.uid === userId ? (
          <button onClick={() => nav(`/edit/${userId}`)} className="bg-orange w-32">
            프로필 수정
          </button>
        ) : (
          <button onClick={() => handleFollowToggle()} className={isFollower ? 'bg-error w-32' : 'bg-green w-32'}>
            {isFollower ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserData