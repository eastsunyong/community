import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

type Iprops = {
  email: string;
  password: string;
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
