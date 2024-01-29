import { IFormValues, IResult } from '@/interface';
import { auth, db, storage } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface Iprops {
  email: string;
  password: string;
  passwordCheck?: string;
}

export const login = async (data: Iprops): Promise<IResult> => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    return { success: true };
  } catch (error: any) {
    const errorCode = error.code;
    return { success: false, errorCode: errorCode };
  }
};

export const signup = async (data: IFormValues): Promise<IResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;
    const userDocRef = doc(db, 'users', user.uid);

    await setDoc(userDocRef, {
      email: data.email,
      nickname: data.nickName,
      bio: data.bio,
      profileImage: '',
      createData: new Date(),
    });

    if (data.profile && data.profile.length) {
      const uploadImg = ref(storage, `${user.uid}`);
      await uploadBytes(uploadImg, data.profile[0]);
      const downloadURL = await getDownloadURL(uploadImg);

      await updateDoc(userDocRef, {
        profileImage: downloadURL,
      });
    }
    return { success: true };
  } catch (error: any) {
    const errorCode = error.code;
    return { success: false, errorCode };
  }
};

export const logout = async () => {
  await signOut(auth);
};
