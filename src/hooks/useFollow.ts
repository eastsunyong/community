import { auth } from '@/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { followUser, getOtherUserData, unfollowUser } from '@/api/authApi';

export const useFollow = (userId: string, showFollowers: boolean, showFollowings: boolean) => {
  const queryClient = useQueryClient();

  const { data: userInfo } = useQuery({
    queryKey: ['Mypage', userId],
    queryFn: () => getOtherUserData(userId),
  });

  const { data: followersData } = useQuery({
    queryKey: ['followers', userId],
    queryFn: async () => {
      const followerPromises = (userInfo?.followers || []).map(async (followerId: string) => {
        const followerData = await getOtherUserData(followerId);
        const isFollower = followerData?.followers?.includes(auth.currentUser?.uid);

        return { ...followerData, isFollower };
      });

      // Promise.all을 사용하여 모든 비동기 작업을 병렬로 처리
      return Promise.all(followerPromises);
    },
    enabled: showFollowers,
  });

  const { data: followingsData } = useQuery({
    queryKey: ['followings', userId],
    queryFn: async () => {
      const followingPromises = (userInfo?.following || []).map(async (followingId: string) => {
        const followingData = await getOtherUserData(followingId);
        const isFollower = followingData?.followers?.includes(auth.currentUser?.uid); // 수정

        return { ...followingData, isFollower };
      });

      return Promise.all(followingPromises);
    },
    enabled: showFollowings,
  });

  const { mutate: follow } = useMutation({
    mutationFn: async (followerId: string) => {
      await followUser(followerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Mypage', userId] }),
        queryClient.invalidateQueries({ queryKey: ['followers', userId] }),
        queryClient.invalidateQueries({ queryKey: ['followings', userId] });
    },
  });
  const { mutate: unFollow } = useMutation({
    mutationFn: async (followerId: string) => {
      await unfollowUser(followerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Mypage', userId] }),
        queryClient.invalidateQueries({ queryKey: ['followers', userId] }),
        queryClient.invalidateQueries({ queryKey: ['followings', userId] });
    },
  });

  const handleFollowToggle = async (followerId: string, isFollower: boolean) => {
    try {
      if (!isFollower) {
        follow(followerId);
      } else {
        unFollow(followerId);
      }
      // // Optimistic update: Update the UI immediately
      // queryClient.setQueryData(['Mypage', userId], (prevData: IUserInfoData) => {
      //   console.log('prevData:', prevData);

      //   return {
      //     ...prevData,
      //     followers: isFollower
      //       ? prevData.followers.filter((follower) => follower !== auth.currentUser?.uid)
      //       : [...prevData.followers, auth.currentUser?.uid],
      //   };
      // });
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  return { userInfo, followersData, followingsData, handleFollowToggle };
};
