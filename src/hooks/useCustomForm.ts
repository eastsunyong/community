import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { IFormValues, IError, IUseCustomFormResult, IAnswer } from '@/interface';
import { login, signup, updateUserInfo } from '@/api/authApi';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';

const useCustomForm = (): IUseCustomFormResult => {
  const nav = useNavigate();
  const [onError, setOnError] = useState<IError>({
    errorCode: '',
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormValues, FieldErrors<IFormValues>>({ mode: 'onChange' });

  const watchEmail = watch('email');
  const watchPassword = watch('password');
  const watchPasswordCheck = watch('passwordCheck');
  const watchBio = watch('bio');
  const watchProfile = watch('profile');
  const watchNickName = watch('nickName');

  // useEffect를 사용하여 입력 필드 감시
  useEffect(() => {
    // 입력이 변할 때마다 에러 초기화
    setOnError({
      errorCode: '',
    });
  }, [watchEmail, watchPassword, watchPasswordCheck, watchBio, watchProfile, watchNickName]); // watch 함수를 사용하여 입력 필드의 값 변경을 감시

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    // 로그인
    if (!data.passwordCheck && data.password) {
      const answer = await login(data);
      handleAuthentication(answer);
    }
    //회원가입
    if (data.password && data.passwordCheck) {
      // 비밀번호 맞는지 확인
      if (data.password !== data.passwordCheck) {
        return setOnError({
          errorCode: 'Passwords do not match',
        });
      }
      const answer = await signup(data);
      handleAuthentication(answer);
    }

    // 유저 정보 업데이트
    if (!data.email && data.nickName && data.bio) {
      if (auth.currentUser) {
        const answer = await updateUserInfo(data, auth.currentUser?.uid);
        if (answer.success) {
          nav(`/mypage/${auth.currentUser.uid}`);
        } else {
          setOnError({
            errorCode: answer.errorCode,
          });
        }
      }
    }
  };

  // 중복되는거 따로 빼기
  const handleAuthentication = (answer: IAnswer) => {
    if (answer.success) {
      nav('/');
    } else {
      setOnError({
        errorCode: answer.errorCode,
      });
    }
  };

  // formattedErrors를 Record<keyof FormValues, string>로 초기화
  const formattedErrors: Record<keyof IFormValues, string> = {
    email: '',
    password: '',
    passwordCheck: '',
    nickName: '',
    profile: '',
    bio: '',
  };

  // 기존 에러 정보를 문자열로 변환하여 할당
  Object.keys(errors).forEach((key) => {
    formattedErrors[key as keyof IFormValues] = errors[key as keyof IFormValues]?.message || '';
  });

  return {
    register,
    handleSubmit: (fn) => handleSubmit(fn),
    errors: formattedErrors,
    onSubmit,
    watch,
    onError,
  };
};

export default useCustomForm;
