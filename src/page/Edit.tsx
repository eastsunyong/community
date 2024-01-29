import ErrorText from '@/components/auth/ErrorText';
import InputField from '@/components/auth/InputField'
import { Button } from '@/components/ui/button';
import useCustomForm from '@/hooks/useCustomForm';
import { useProfile } from '@/hooks/useProfile';
import { bioOpt, nickNameOpt, profileOpt } from '@/interface/validation';
import React from 'react'

const Edit = () => {
    const { register, handleSubmit, errors, onSubmit, watch, onError } = useCustomForm();
    const { previewImage } = useProfile(watch)
    console.log(watch('bio'));

    return (
        <div className='w-full h-screen flex-col bg-gray flex items-center justify-center px-10'>
            <div className='w-3/12 mb-2'>
                <h2 className='text-black text-l font-bold'>개인 정보 수정</h2>
                <p className='text-fontGray text-xs'>아래에서 원하는 내용을 수정하시고, 변경을 완료하시면 즉시 적용됩니다.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='w-3/12 h-4/6 mb-20 rounded-md'>
                <InputField label="프로필 이미지" name="profile" type="file" register={register} errors={errors} inputOptions={profileOpt} previewImage={previewImage} />
                <InputField label="닉네임" name="nickName" register={register} errors={errors} inputOptions={nickNameOpt} defaultValue={'asd'} />
                <InputField label="자기소개" name="bio" register={register} errors={errors} type="textarea" inputOptions={bioOpt} defaultValue={'asd'} />
                <ErrorText onError={onError} isLog={false} />
                <Button
                    type="submit"
                    className='bg-blue mt-6'>회원가입
                </Button>
            </form>
        </div>
    )
}

export default Edit
