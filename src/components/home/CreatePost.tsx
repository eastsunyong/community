import React from 'react';
import useCustomForm from "@/hooks/useCustomForm";
import InputField from "../auth/InputField";
import { Button } from "../ui/button";
import { useProfile } from "@/hooks/usePreview";

const CreatePost = () => {
    const { register, handleSubmit, errors, onSubmit, watch } = useCustomForm();
    const { previewImages } = useProfile(watch)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-3/12 h-4/6 mb-20 rounded-md'>
            <InputField label="게시물 사진" name="profile" type="file" register={register} errors={errors} previewImage={previewImages} usage='posts' />
            <InputField label='제목' name='title' register={register} errors={errors} />
            <InputField label="내용" name="content" register={register} errors={errors} type="textarea" />
            <Button
                type="submit"
                className='bg-blue mt-6'>게시물 생성
            </Button>
        </form>
    );
};

export default CreatePost;