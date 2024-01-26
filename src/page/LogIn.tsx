import React from 'react';
import useCustomForm from '@/hooks/useCustomForm';
import { emailOpt, pwOpt } from '@/interface/validation';

const LogIn: React.FC = () => {
    const { register, handleSubmit, errors, onSubmit } = useCustomForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                이메일
                <input type="text" {...register('email', emailOpt)} />
                {errors.email && <span>{errors.email}</span>}
            </label>

            <label>
                비밀번호
                <input type="password" {...register('password', pwOpt)} />
                {errors.password && <span>{errors.password}</span>}
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default LogIn;