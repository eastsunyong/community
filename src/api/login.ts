import { auth } from '@/firebase';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

type Iprops = {
  email: string;
  password: string;
};

export const login = async (data: Iprops) => {
  let answer = false;
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    console.log('user with signIn', userCredential.user);
    // localStorage.setItem('accessToken', userCredential.user.);
    answer = true;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error with signIn', errorCode, errorMessage);
    answer = false;
  }
  return answer;
};
