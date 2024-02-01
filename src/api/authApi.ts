import { IFormValues, IResult } from '@/interface';
import { auth, db, storage } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  AuthProvider,
} from 'firebase/auth';
import { arrayRemove, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// 로그인
export const login = async (data: IFormValues): Promise<IResult> => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    return { success: true };
  } catch (error: any) {
    const errorCode = error.code;
    return { success: false, errorCode: errorCode };
  }
};

//회원가입
export const signup = async (data: IFormValues): Promise<IResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;
    const userDocRef = doc(db, 'users', user.uid);

    await setDoc(userDocRef, {
      email: data.email,
      password: data.password,
      nickname: data.nickName,
      bio: data.bio,
      profileImage: '',
      uid: user.uid,
      follower: 0,
      following: 0,
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

// 로그아웃
export const logout = async () => {
  await signOut(auth);
};

// 소셜로그인
export const socialLogin = async (provider: AuthProvider): Promise<IResult> => {
  try {
    const result = await signInWithPopup(auth, provider);
    // 소셜 로그인이 성공한 경우
    if (result.user) {
      // 사용자 정보 가져오기
      const { uid, displayName, email, photoURL } = result.user;
      // Firestore에 사용자 정보 저장
      const userDocRef = doc(collection(db, 'users'), uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // 사용자가 Firestore에 등록되어 있지 않은 경우에만 저장
        await setDoc(userDocRef, {
          email: email,
          uid: uid,
          nickname: displayName,
          profileImage: photoURL,
          bio: '',
          // 추가 필요한 속성 등
        });

        console.log('소셜 로그인 사용자 정보 Firestore 저장 성공!');
      }

      return { success: true };
    } else {
      return { success: false, errorCode: 'User information not available' };
    }
  } catch (error: any) {
    console.error('소셜 로그인 실패:', error);
    return { success: false, errorCode: error.code };
  }
};

// 내 정보 가져오기
export const getMyInfoData = async () => {
  let myUserData;
  if (auth.currentUser) {
    const myUserId = auth.currentUser.uid;
    const myUserDocRef = doc(db, 'users', myUserId);
    const myUserDoc = await getDoc(myUserDocRef);

    if (myUserDoc.exists()) {
      myUserData = myUserDoc.data();
    }
  }
  return myUserData;
};

// 다른 유저 정보 가져오기
export const getOtherUserData = async (userId: any) => {
  let otherUserData;
  const otherUserDocRef = doc(db, 'users', userId);
  const otherUserDoc = await getDoc(otherUserDocRef);

  if (otherUserDoc.exists()) {
    otherUserData = otherUserDoc.data();
  }
  return otherUserData;
};

// 파일 삭제 함수
export const deleteFile = async (filePath: string | undefined) => {
  if (filePath) {
    const fileRef = ref(storage, filePath);

    try {
      await deleteObject(fileRef);
      console.log('파일 삭제 성공!');
    } catch (error) {
      console.error('파일 삭제 실패: ', error);
    }
  }
};

// 유저 정보 업데이트
export const updateUserInfo = async (data: IFormValues, uid: string): Promise<IResult> => {
  if (uid) {
    const docRef = doc(db, 'users', uid);

    try {
      // 파일 삭제
      await deleteFile(uid);

      // 새로운 프로필 이미지 업로드
      if (data.profile && data.profile.length) {
        const uploadImg = ref(storage, `${uid}`);
        await uploadBytes(uploadImg, data.profile[0]);
        const downloadURL = await getDownloadURL(uploadImg);

        // 나머지 정보 업데이트
        await updateDoc(docRef, {
          nickname: data.nickName,
          bio: data.bio,
          profileImage: downloadURL,
        });
      }
      console.log('문서 업데이트 성공!');
      return { success: true };
    } catch (error) {
      console.error('문서 업데이트 실패: ', error);
      return { success: false };
    }
  } else {
    return { success: false };
  }
};

export const getUserData = async (userId: string) => {
  const userDocRef = doc(db, 'users', userId);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return userDocSnapshot.data() as Document;
  }

  return null;
};

export const followUser = async (userId: string) => {
  const currentUserRef = doc(collection(db, 'users'), auth.currentUser?.uid);
  const targetUserRef = doc(collection(db, 'users'), userId);

  await updateDoc(currentUserRef, { following: arrayUnion(userId) });
  await updateDoc(targetUserRef, { followers: arrayUnion(auth.currentUser?.uid) });
};

export const unfollowUser = async (userId: string) => {
  const currentUserRef = doc(collection(db, 'users'), auth.currentUser?.uid);
  const targetUserRef = doc(collection(db, 'users'), userId);

  await updateDoc(currentUserRef, { following: arrayRemove(userId) });
  await updateDoc(targetUserRef, { followers: arrayRemove(auth.currentUser?.uid) });
};
