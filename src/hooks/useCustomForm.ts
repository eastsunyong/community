import { useForm, SubmitHandler, FieldErrors, UseFormWatch } from 'react-hook-form';

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
};

const useCustomForm = (): UseCustomFormResult => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues, FieldErrors<FormValues>>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    // 여기에서 필요한 로직 수행
    // if (data.profile == undefined) {
    //   console.log(1);
    // } else {
    //   return;
    // }
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
  };
};

export default useCustomForm;
