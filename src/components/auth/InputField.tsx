import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '../ui/textarea';
import { UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form';
import ImageField from './ImageField';

interface InputFieldProps {
    label: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    errors: any;
    type?: 'text' | 'password' | 'file' | 'textarea' | 'confirm';
    placeholder?: string;
    inputOptions?: RegisterOptions;
    previewImage?: string;
    defaultValue?: string; // 수정: defaultValue를 사용하도록 변경
}

const InputField: React.FC<InputFieldProps> = ({ label, name, register, errors, type = 'text', placeholder = '', inputOptions = {}, previewImage, defaultValue }) => {
    return (
        <div className={`flex flex-col ${type === 'file' ? 'items-center' : 'justify-center'} relative pb-6`}>
            {type !== 'file' && <Label>{label}</Label>}
            {type === 'file' ?
                <ImageField name={name} register={register} inputOptions={inputOptions} previewImage={previewImage} defaultValue={defaultValue} />
                : type === 'textarea' ?
                    (
                        <Textarea
                            defaultValue={defaultValue} // 수정: defaultValue를 사용하도록 변경
                            placeholder={placeholder || `${label}을 입력해주세요`}
                            className={`${errors[name] ? 'border-error' : 'border-black'} text-s`}
                            {...register(name, inputOptions)}
                        />
                    )
                    :
                    (
                        <Input
                            defaultValue={defaultValue} // 수정: defaultValue를 사용하도록 변경
                            type={type}
                            maxLength={type === 'confirm' ? 4 : undefined}
                            placeholder={placeholder || `${label}을 입력해주세요`}
                            className={`${errors[name] ? 'border-error' : 'border-black'} text-s`}
                            {...register(name, inputOptions)}
                        />
                    )
            }
            {errors[name] && <p className='text-error absolute bottom-0'>{errors[name]}</p>}
        </div>
    );
};

export default InputField;
