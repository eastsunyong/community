import { auth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

type Iprops = {
  email: string;
  password: string;
  passwordCheck?: string;
};

type LoginResult = {
  success: boolean;
  errorCode?: string;
};

export const login = async (data: Iprops): Promise<LoginResult> => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    return { success: true };
  } catch (error: any) {
    const errorCode = error.code;
    console.error('Error signing in:', errorCode);
    return { success: false, errorCode };
  }
};

export const signup = async (data: Iprops) => {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    return { success: true };
  } catch (error: any) {
    const errorCode = error.code;
    console.error('Error signing in:', errorCode);
    return { success: false, errorCode };
  }
};

export const userInfo = async (data: Iprops) => {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    return { success: true };
  } catch (error: any) {
    const errorCode = error.code;
    console.error('Error signing in:', errorCode);
    return { success: false, errorCode };
  }
};
