import { SubmitHandler, UseFormWatch } from 'react-hook-form';

export interface IFormValues {
  email: string;
  password: string;
  passwordCheck?: string;
  nickName?: string;
  profile?: FileList | undefined;
  bio?: string;
  title?: string;
  content?: string;
}

export interface IError {
  errorCode?: string;
}

export interface IResult {
  success: boolean;
  errorCode?: string;
}

export interface IUseCustomFormResult {
  register: any;
  handleSubmit: (onSubmit: SubmitHandler<IFormValues>) => (e: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<keyof IFormValues, string>;
  onSubmit: SubmitHandler<IFormValues>;
  watch: UseFormWatch<IFormValues>;
  onError: IError;
}
export interface IAnswer {
  success: boolean;
  errorCode?: string;
}

export interface IUserInfoData {
  email: string;
  password?: string;
  nickname: string;
  bio: string;
  profileImage: string;
  uid: string;
  following: [];
  followers: [];
}
