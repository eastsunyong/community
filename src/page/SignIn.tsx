import React, { useState } from 'react';
import useCustomForm from '@/hooks/useCustomForm';
import { emailOpt, confirmOpt } from '@/interface/validation';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const nav = useNavigate()
    const { register, handleSubmit, errors, onSubmit, watch } = useCustomForm();
    const [text, setText] = useState<boolean>(true);
    return (
        <div className='w-full h-screen flex-col bg-gray flex items-center justify-center px-10'>
            <div className='w-3/12 mb-5'>
                <h2 className='text-black text-l font-bold'>이메일 인증</h2>
                <p className='text-fontGray text-xs'>{text ? '원활한 서비스 제공을 위해, 휴대폰 번호를 입력해 주세요.' : <>등록된 휴대폰 번호로 인증번호가 전송되었습니다.
                    <br />인증번호를 입력해 주세요.</>}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='w-3/12 h-3/6 mb-40 rounded-md'>
                <div className='flex flex-col mb-4'>
                    <Label className='text-labelGray'>이메일 인증</Label>
                    <Input
                        type="text"
                        name='email'
                        id='email'
                        placeholder='이메일을 입력해주세요'
                        className={`${errors.email ? 'border-error' : 'border-black'} text-s`}
                        {...register('email', emailOpt)} />
                    {errors.email && <span className='inline'>{errors.email}</span>}
                </div>

                {
                    text ?
                        <Button onClick={() => { setText(false) }}
                            type="submit"
                            className={`${errors.email || watch('email')?.length === undefined ? 'bg-gray-light opacity-50 pointer-events-none' : 'bg-blue'} text-s w-full h-10`}>
                            인증번호 전송
                        </Button> : <>
                            <div className='flex flex-col mb-4'>
                                <Label className='text-labelGray'>인증번호</Label>
                                <Input
                                    type="text"
                                    {...register('confirm', confirmOpt)}
                                    maxLength={4}
                                    placeholder='인증번호 4자리'
                                    className={`${errors.confirm ? 'border-error' : 'border-black'} text-s`} />
                            </div>
                            <Button
                                onClick={() => { nav('/signin') }}
                                type="button"
                                className={`${watch('confirm')?.length === 4 ? 'bg-blue' : 'bg-gray-light opacity-50 pointer-events-none'} text-s w-full h-10 mt-4`}>
                                확인
                            </Button>
                        </>
                }
            </form>
        </div>
    )
}

export default SignIn