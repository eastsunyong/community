import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
  nickName: string | undefined;
  id: string | undefined;
  profile: string | undefined;
};

type UseCustomFormResult = {
  register: any;
  handleSubmit: (onSubmit: SubmitHandler<FormValues>) => (e: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<keyof FormValues, string>;
  onSubmit: SubmitHandler<FormValues>; // onSubmit 속성을 추가
};

const useCustomForm = (): UseCustomFormResult => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues, FieldErrors<FormValues>>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    // 여기에서 필요한 로직 수행
  };

  // formattedErrors를 Record<keyof FormValues, string>로 초기화
  const formattedErrors: Record<keyof FormValues, string> = {
    email: '',
    password: '',
    nickName: '',
    id: '',
    profile: '',
  };

  // 기존 에러 정보를 문자열로 변환하여 할당
  Object.keys(errors).forEach((key) => {
    formattedErrors[key as keyof FormValues] = errors[key as keyof FormValues]?.message || '';
  });

  return {
    register,
    handleSubmit: (fn) => handleSubmit(fn),
    errors: formattedErrors,
    onSubmit, // onSubmit 속성 추가
  };
};

export default useCustomForm;
