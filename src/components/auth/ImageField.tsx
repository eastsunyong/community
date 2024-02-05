import React from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface IImageFieldProps {
    name: string;
    register: UseFormRegister<FieldValues>;
    inputOptions?: RegisterOptions;
    previewImages?: string[] | string;
    defaultValue?: string;
    usage?: string;
}

const ImageField: React.FC<IImageFieldProps> = ({ previewImages, register, name, inputOptions, defaultValue, usage }) => {
    const handleImageClick = () => {
        const fileInput = document.getElementById(name) as HTMLInputElement | null;
        fileInput?.click();
    };

    return (
        <>
            <div className='relative w-20 h-20 rounded-full overflow-visible cursor-pointer' onClick={handleImageClick}>
                {usage === '회원가입' ?
                    <>
                        <img src={previewImages ? previewImages[0] : defaultValue || '/userDefalt.jpg'} className='w-full h-full object-cover rounded-full' alt="프로필 이미지" />
                        <label className='absolute bottom-[-14px] right-[-12px] w-12 h-12 flex items-center justify-center rounded-full'>
                            <img src='/userDefalt.jpg' className='w-8 h-8 rounded-full' alt="기본 이미지" />
                        </label>
                        <input type='file' accept='image/*' id={name} className='absolute top-0 left-0 w-full h-full opacity-0' {...register(name, inputOptions)} hidden />
                    </> :
                    <>
                        {previewImages?.map((image: any, index: number) => (
                            <div key={index} className={`relative z-10`}>
                                <img src={image || '/userDefalt.jpg'} className='w-30 h-30 object-cover rounded-full bg-green' alt={`프로필 이미지 ${index + 1}`} />
                            </div>
                        ))}
                        <label className='absolute bottom-[-14px] right-[-12px] w-12 h-12 flex items-center justify-center rounded-full'>
                            <img src='/imagePlus.png' alt='기본 이미지' />
                        </label>
                        <input type='file' accept='image/*' id={name} className='absolute top-0 left-0 w-full h-full opacity-0' {...register(name, inputOptions)} hidden multiple />
                    </>
                }
            </div>
        </>
    );
};

export default ImageField;
