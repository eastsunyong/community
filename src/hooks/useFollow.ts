import { auth } from '@/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { followUser, getOtherUserData, unfollowUser } from '@/api/authApi';

export const useFollow = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: userInfo } = useQuery({
    queryKey: ['Mypage', userId],
    queryFn: () => getOtherUserData(userId),
  });

  const { mutate: follow } = useMutation({
    mutationFn: async () => {
      await followUser(userId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Mypage', userId] }),
  });
  const { mutate: unFollow } = useMutation({
    mutationFn: async () => {
      await unfollowUser(userId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Mypage', userId] }),
  });

  const isFollower = userInfo?.followers?.includes(auth.currentUser?.uid);

  const handleFollowToggle = async () => {
    try {
      if (!isFollower) {
        await follow();
      } else {
        await unFollow();
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

  return { userInfo, handleFollowToggle };
};
