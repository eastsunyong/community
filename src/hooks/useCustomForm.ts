import { useState } from 'react';
import { useForm, SubmitHandler, FieldErrors, UseFormWatch } from 'react-hook-form';
import { login } from '@/api/login';
import { useNavigate } from 'react-router-dom';

type IFormValues = {
  email: string;
  password: string;
  nickName: string | undefined;
  id: string | undefined;
  profile: string | undefined;
  confirm: string | undefined;
};

type IError = {
  errorCode: string | undefined;
};

type IUseCustomFormResult = {
  register: any;
  handleSubmit: (onSubmit: SubmitHandler<IFormValues>) => (e: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<keyof IFormValues, string>;
  onSubmit: SubmitHandler<IFormValues>;
  watch: UseFormWatch<IFormValues>;
  onError: IError;
};

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
    if (data.profile === undefined) {
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
  };
  // formattedErrors를 Record<keyof FormValues, string>로 초기화
  const formattedErrors: Record<keyof IFormValues, string> = {
    email: '',
    password: '',
    nickName: '',
    id: '',
    profile: '',
    confirm: '',
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
