import { useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { IFormValues, IError, IUseCustomFormResult } from '@/interface';
import { login, signup } from '@/api/authApi';
import { useNavigate } from 'react-router-dom';

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

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    // 로그인
    if (!data.passwordCheck && data.password) {
      const answer = await login(data);
      if (answer.success) {
        nav('/');
        alert('로그인 성공');
      } else {
        setOnError({
          errorCode: answer.errorCode,
        });
      }
    }
    //회원가입
    if (data.password && data.passwordCheck) {
      if (data.password !== data.passwordCheck) {
        return setOnError({
          errorCode: 'Passwords do not match',
        });
      }
      const answer = await signup(data);
      if (answer.success) {
        nav('/');
        alert('회원가입 성공');
      } else {
        setOnError({
          errorCode: answer.errorCode,
        });
      }
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
