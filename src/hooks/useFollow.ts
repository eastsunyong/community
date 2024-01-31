import { useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const followUser = async (userId: string) => {
  const currentUserRef = doc(collection(db, 'users'), auth.currentUser?.uid);
  const targetUserRef = doc(collection(db, 'users'), userId);

  await updateDoc(currentUserRef, { following: arrayUnion(userId) });
  await updateDoc(targetUserRef, { followers: arrayUnion(auth.currentUser?.uid) });
};

const unfollowUser = async (userId: string) => {
  const currentUserRef = doc(collection(db, 'users'), auth.currentUser?.uid);
  const targetUserRef = doc(collection(db, 'users'), userId);

  await updateDoc(currentUserRef, { following: arrayRemove(userId) });
  await updateDoc(targetUserRef, { followers: arrayRemove(auth.currentUser?.uid) });
};

const useFollow = (userId: string) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['FollowOrUnFollow'],
    mutationFn: async () => {
      const previousIsFollowing = await queryClient.getQueryData(['isFollow', userId]);
      const newIsFollowing = !previousIsFollowing;

      if (newIsFollowing) {
        await followUser(userId);
      } else {
        await unfollowUser(userId);
      }

      // 업데이트된 값을 설정
      queryClient.setQueryData(['isFollow', userId], newIsFollowing);

      setIsFollowing(newIsFollowing);
    },
  });

  return [isFollowing, mutation.mutate] as const;
};

export default useFollow;
