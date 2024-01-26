import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldErrors, UseFormWatch } from 'react-hook-form';
import { login } from '@/api/login';
type FormValues = {
  email: string;
  password: string;
  nickName: string | undefined;
  id: string | undefined;
  profile: string | undefined;
  confirm: string | undefined;
};

type UseCustomFormResult = {
  register: any;
  handleSubmit: (onSubmit: SubmitHandler<FormValues>) => (e: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<keyof FormValues, string>;
  onSubmit: SubmitHandler<FormValues>;
  watch: UseFormWatch<FormValues>;
  condition: {
    result: boolean;
    id: string;
  };
};

const useCustomForm = (): UseCustomFormResult => {
  const [condition, setCondition] = useState({
    result: false,
    id: '',
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues, FieldErrors<FormValues>>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.profile === undefined) {
      // data.profile이 undefined일 때 로그인 로직 수행
      try {
        condition.result = await login(data);
        console.log(condition.result);
      } catch (error: any) {
        console.error('로그인 실패', error.message);
      }
    }
  };
  // formattedErrors를 Record<keyof FormValues, string>로 초기화
  const formattedErrors: Record<keyof FormValues, string> = {
    email: '',
    password: '',
    nickName: '',
    id: '',
    profile: '',
    confirm: '',
  };

  // 기존 에러 정보를 문자열로 변환하여 할당
  Object.keys(errors).forEach((key) => {
    formattedErrors[key as keyof FormValues] = errors[key as keyof FormValues]?.message || '';
  });

  return {
    register,
    handleSubmit: (fn) => handleSubmit(fn),
    errors: formattedErrors,
    onSubmit,
    watch,
    condition,
  };
};

export default useCustomForm;
