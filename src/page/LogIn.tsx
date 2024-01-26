import React from 'react';
import useCustomForm from '@/hooks/useCustomForm';
import { emailOpt, pwOpt } from '@/interface/validation';
import { loginErrorCode } from '@/interface/loginErrorCode';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import Title from '@/components/common/Title';

const LogIn: React.FC = () => {
    const { register, handleSubmit, errors, onSubmit, onError } = useCustomForm();
    // 에러코드에 따른 메시지 표시
    let errorMessage = '';
    if (onError.errorCode !== '') {
        errorMessage = loginErrorCode(onError.errorCode);
    }
    return (
        <div className='w-full h-screen flex-col bg-gray flex items-center justify-center'>
            <Title title='Log in' />
            <form onSubmit={handleSubmit(onSubmit)} className='w-3/12 h-3/6 rounded-md mb-20 px-10'>
                <div className='flex flex-col relative pb-8'>
                    <Label>이메일</Label>
                    <Input
                        type="text"
                        placeholder='이메일을 입력해주세요'
                        className={`${errors.email ? 'border-error' : 'border-black'} text-s`}
                        {...register('email', emailOpt)} />
                    {errors.email && <p className='text-error absolute bottom-0'>{errors.email}</p>}
                </div>

                <div className='flex flex-col relative mt-4 pb-8'>
                    <Label>비밀번호</Label>
                    <Input
                        type="password"
                        placeholder='비밀번호를 입력해주세요'
                        className={`${errors.password ? 'border-error' : 'border-black'}`}
                        {...register('password', pwOpt)} />
                    {errors.password && <p className='text-error absolute bottom-0'>{errors.password}</p>}
                    <div className='flex items-center justify-center'>

                        <p className='text-error absolute bottom-0'>{errorMessage}</p>
                    </div>
                </div>

                <Button type="submit" className=' w-full h-10 mt-4 bg-blue'>로그인</Button>
            </form>
        </div>
    );
};

export default LogIn;