// MyPage.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFollow } from '@/hooks/useFollow';
import InfoBox from '@/components/mypage/InfoBox';
import { auth } from '@/firebase';

const MyPage = () => {
  const nav = useNavigate();
  const { userId } = useParams() as { userId: string };
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  const { userInfo, followersData, followingsData, handleFollowToggle } = useFollow(userId, showFollowers, showFollowings);

  const isFollower = userInfo?.followers?.includes(auth.currentUser?.uid);

  const handleFollowersClick = () => {
    setShowFollowers((prev) => !prev);
    setShowFollowings(false);  // showFollowings 상태를 false로 설정
  };

  const handleFollowingsClick = () => {
    setShowFollowings((prev) => !prev);
    setShowFollowers(false);  // showFollowers 상태를 false로 설정
  };

  return (
    <div className="w-full h-screen bg-blue flex items-center justify-center">
      <div className="w-5/12 h-screen bg-gray">
        <div className="flex flex-row justify-between px-20 pt-12 bg-orange">
          <img
            className="w-44 h-44 object-cover rounded-full"
            src={`${userInfo?.profileImage ? userInfo.profileImage : '/userDefalt.jpg'}`}
          />
          <div className="flex flex-row items-center gap-6">
            <InfoBox num={12} info={'게시물'} />
            <InfoBox num={userInfo?.followers?.length} info={'팔로워'} onClick={handleFollowersClick} />
            <InfoBox num={userInfo?.following?.length} info={'팔로우'} onClick={handleFollowingsClick} />
          </div>
        </div>
        <div className="px-20 pt-3 font-bold text-m flex justify-between mt-5 items-center">
          <p>{userInfo?.nickname}</p>
          {auth.currentUser?.uid === userId ? (
            <button onClick={() => nav(`/edit/${userId}`)} className="bg-orange w-32">
              프로필 수정
            </button>
          ) : (
            <button
              onClick={() => handleFollowToggle(userId, isFollower)}
              className={isFollower ? 'bg-error w-32' : 'bg-green w-32'}
            >
              {isFollower ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>

      {showFollowers && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Followers</h2>
            {followersData?.length === 0 ? (
              <p>팔로워가 없습니다</p>
            ) : (
              <ul>
                {followersData?.map((follower) => (
                  <div key={follower.uid} className="w-full h-40 border cursor-pointer border-blue-500 flex items-center px-10">
                    <img
                      className="w-24 h-24 rounded-full object-cover"
                      src={follower.profileImage}
                      alt={follower.nickname}
                    />
                    <div className="flex items-center justify-between w-full px-8">
                      <div>
                        <p>{follower.nickname}</p>
                        <p>{follower.bio}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleFollowToggle(follower.uid, follower.isFollower)}
                          className={follower.isFollower ? 'bg-error w-32' : 'bg-green w-32'}
                        >
                          {follower.isFollower ? 'Unfollow' : 'Follow'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}
            <button onClick={() => setShowFollowers(false)} className="mt-4 text-blue-500 underline cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}

      {showFollowings && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Followings</h2>
            {followingsData?.length === 0 ? (
              <p>팔로잉하는 사용자가 없습니다</p>
            ) : (
              <ul>
                {followingsData?.map((following) => (
                  <div key={following.uid} className="w-full h-40 border cursor-pointer border-blue-500 flex items-center px-10">
                    <img
                      className="w-24 h-24 rounded-full object-cover"
                      src={following.profileImage}
                      alt={following.nickname}
                    />
                    <div className="flex items-center justify-between w-full px-8">
                      <div>
                        <p>{following.nickname}</p>
                        <p>{following.bio}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleFollowToggle(following.uid, following.isFollower)}
                          className={following.isFollower ? 'bg-error w-32' : 'bg-green w-32'}
                        >
                          {following.isFollower ? 'Unfollow' : 'Follow'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}
            <button onClick={() => setShowFollowings(false)} className="mt-4 text-blue-500 underline cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
