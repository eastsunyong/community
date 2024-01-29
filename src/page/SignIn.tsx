import useCustomForm from '@/hooks/useCustomForm';
import { emailOpt, pwOpt, pwCheckOpt, profileOpt, nickNameOpt, bioOpt } from '@/interface/validation';
import { Button } from '@/components/ui/button';
import RegistetText from '@/components/auth/SignupText';
import InputField from '@/components/auth/InputField';
import { useProfile } from '@/hooks/useProfile';
import ErrorText from '@/components/auth/ErrorText';

const SignIn = () => {
    const { register, handleSubmit, errors, onSubmit, watch, onError } = useCustomForm();
    const { previewImage } = useProfile(watch)

    return (
        <div className='w-full h-screen flex-col bg-gray flex items-center justify-center px-10'>
            <RegistetText />

            <form onSubmit={handleSubmit(onSubmit)} className='w-3/12 h-4/6 mb-20 rounded-md'>
                <InputField label="프로필 이미지" name="profile" type="file" register={register} errors={errors} inputOptions={profileOpt} previewImage={previewImage} />
                <InputField label='이메일' name='email' register={register} errors={errors} inputOptions={emailOpt} />
                <InputField label="비밀번호" name="password" type="password" register={register} errors={errors} inputOptions={pwOpt} />
                <InputField label="비밀번호 확인" name="passwordCheck" type="password" register={register} errors={errors} inputOptions={pwCheckOpt} />
                <InputField label="닉네임" name="nickName" register={register} errors={errors} inputOptions={nickNameOpt} />
                <InputField label="자기소개" name="bio" register={register} errors={errors} type="textarea" inputOptions={bioOpt} />
                <ErrorText onError={onError} isLog={false} />
                <Button
                    type="submit"
                    className='bg-blue w-full h-10 mt-9'>회원가입
                </Button>
            </form>
        </div>
    )
}
export default SignIn;
