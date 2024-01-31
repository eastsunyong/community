import { getMyInfoData, getOtherUserData } from '@/api/authApi';
import { auth } from '@/firebase';
import { IUserInfoData } from '@/interface';
import { DocumentData } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useUserData = (userId: any) => {
  const [myUserData, setMyUserData] = useState<IUserInfoData | DocumentData>({});
  const [otherUserData, setOtherUserData] = useState<IUserInfoData | DocumentData>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const myUserId = auth.currentUser.uid;
        if (myUserId === userId) {
          const myData = await getMyInfoData();
          if (myData) {
            setMyUserData(myData);
          }
        } else {
          const otherData = await getOtherUserData(userId);
          if (otherData) {
            setOtherUserData(otherData);
          }
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [userId]);
  return { myUserData, otherUserData, loading };
};
