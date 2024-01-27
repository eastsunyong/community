import React from 'react';
import useCustomForm from '@/hooks/useCustomForm';
import { emailOpt, pwOpt } from '@/interface/validation';
import { loginErrorCode } from '@/interface/loginErrorCode';
import { Button } from '@/components/ui/button';
import InputField from '@/components/common/InputField';

const LogIn: React.FC = () => {
    const { register, handleSubmit, errors, onSubmit, onError } = useCustomForm();
    // 에러코드에 따른 메시지 표시
    let errorMessage = '';
    if (onError.errorCode !== '') {
        errorMessage = loginErrorCode(onError.errorCode);
    }

    return (
        <div className='w-full h-screen flex-col bg-gray flex items-center justify-center'>
            <div className='flex justify-center mt-5 text-l font-bold mb-8'>
                <h2>log in</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-3/12 h-3/6 rounded-md mb-20 px-10'>
                <InputField label="이메일" name="email" register={register} errors={errors} inputOptions={emailOpt} />
                <InputField label="비밀번호" name="password" register={register} errors={errors} type="password" inputOptions={pwOpt} />
                <div className='flex items-center justify-center'>
                    <p className='text-error absolute bottom-0'>{errorMessage}</p>
                </div>
                <Button type="submit" className=' w-full h-10 mt-4 bg-blue'>로그인</Button>
            </form>
        </div>
    );
};

export default LogIn;