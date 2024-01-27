import { SubmitHandler, UseFormWatch } from 'react-hook-form';

export interface IFormValues {
  email: string;
  password: string;
  passwordCheck?: string;
  nickName?: string;
  id?: string;
  profile?: string;
  confirm?: string;
  bio?: string;
}

export interface IError {
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
