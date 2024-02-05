import useCustomForm from '@/hooks/useCustomForm';
import { emailOpt, pwOpt, pwCheckOpt, profileOpt, nickNameOpt, bioOpt } from '@/interface/validation';
import { Button } from '@/components/ui/button';
import InputField from '@/components/auth/InputField';
import { useProfile } from '@/hooks/useProfile';
import ErrorText from '@/components/auth/ErrorText';

const SignIn = () => {
  const { register, handleSubmit, errors, onSubmit, watch, onError } = useCustomForm();
  const { previewImages } = useProfile(watch)

  return (
    <div className='w-full h-screen flex-col bg-gray flex items-center justify-center px-10'>
      <div className='w-3/12 mb-2'>
        <h2 className='text-black text-l font-bold'>필수 정보 입력</h2>
        <p className='text-fontGray text-xs'> 가입을 위해 필수 정보를 입력해주세요. </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='w-3/12 h-4/6 mb-20 rounded-md'>
        <InputField label="프로필 이미지" name="profile" type="file" register={register} errors={errors} inputOptions={profileOpt} previewImage={previewImages} usage='회원가입' />
        <InputField label='이메일' name='email' register={register} errors={errors} inputOptions={emailOpt} />
        <InputField label="비밀번호" name="password" type="password" register={register} errors={errors} inputOptions={pwOpt} />
        <InputField label="비밀번호 확인" name="passwordCheck" type="password" register={register} errors={errors} inputOptions={pwCheckOpt} />
        <InputField label="닉네임" name="nickName" register={register} errors={errors} inputOptions={nickNameOpt} />
        <InputField label="자기소개" name="bio" register={register} errors={errors} type="textarea" inputOptions={bioOpt} />
        <ErrorText onError={onError} isLog={false} />
        <Button
          type="submit"
          className='bg-blue mt-6'>회원가입
        </Button>
      </form>
    </div>
  )
}
export default SignIn;
