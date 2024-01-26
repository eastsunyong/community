import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

export const useAuth = (): boolean => {
  const [userState, setUserState] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      const isAuthenticated = user !== null;
      setUserState(isAuthenticated);
    });

    return () => {
      // 컴포넌트가 언마운트될 때 리스너에서 구독 취소
      unsubscribe();
    };
  }, []);

  return userState;
};
