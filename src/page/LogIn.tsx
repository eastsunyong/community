import React from 'react';
import useCustomForm from '@/hooks/useCustomForm';
import { emailOpt, pwOpt } from '@/interface/validation';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import Title from '@/components/common/Title';

const LogIn: React.FC = () => {
    const { register, handleSubmit, errors, onSubmit } = useCustomForm();
    return (
        <div className='w-full h-screen flex-col bg-gray flex items-center justify-center'>
            <Title title='Log in' />
            <form onSubmit={handleSubmit(onSubmit)} className='w-3/12 h-3/6 bg-white shadow-lg rounded-md mb-20 px-10'>
                <div className='flex flex-col'>
                    <Label>이메일</Label>
                    <Input
                        type="text"
                        placeholder='이메일을 입력해주세요'
                        className={`${errors.email ? 'border-error' : 'border-black'} text-s`}
                        {...register('email', emailOpt)} />
                    {errors.email && <span className='inline'>{errors.email}</span>}
                </div>

                <Label>
                    비밀번호
                    <Input
                        type="password"
                        placeholder='비밀번호를 입력해주세요'
                        className={`${errors.password ? 'border-error' : 'border-black'}`}
                        {...register('password', pwOpt)} />
                    {errors.password && <p>{errors.password}</p>}
                </Label>
                <Button type="submit" className='w-full h-10 bg-blue'>Submit</Button>
            </form>
        </div>
    );
};

export default LogIn;