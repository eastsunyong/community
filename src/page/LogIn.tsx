import React from 'react';
import useCustomForm from '@/hooks/useCustomForm';
import { emailOpt, pwOpt } from '@/interface/validation';
import { Button } from '@/components/ui/button';
import InputField from '@/components/auth/InputField';
import ErrorText from '@/components/auth/ErrorText';
import SocialLoginBtn from '@/components/auth/SocialLoginBtn';

const LogIn: React.FC = () => {
    const { register, handleSubmit, errors, onSubmit, onError } = useCustomForm();

    return (
        <div className='w-full h-screen flex-col bg-gray flex items-center justify-center'>
            <div className='flex justify-center mt-5 text-l font-bold mb-8'>
                <h2>log in</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-3/12 h-3/6 rounded-md mb-20 px-10'>
                <InputField label="이메일" name="email" register={register} errors={errors} inputOptions={emailOpt} />
                <InputField label="비밀번호" name="password" register={register} errors={errors} type="password" inputOptions={pwOpt} />
                <ErrorText onError={onError} isLog={true} />
                <Button type="submit" className=' bg-blue'>로그인</Button>
                <SocialLoginBtn provider="Google" />
                <SocialLoginBtn provider="Github" />
            </form>
        </div>
    );
};

export default LogIn;