// ErrorText.tsx
import { errorCodeHandler } from '@/interface/errorCode';
import React from 'react';
interface ErrorTextProps {
    onError: {
        errorCode?: string;
    };
    isLog: boolean
}

const ErrorText: React.FC<ErrorTextProps> = ({ onError, isLog }) => {
    let errorMessage = '';
    if (onError.errorCode !== '') {
        errorMessage = errorCodeHandler({ errorCode: onError.errorCode }, isLog);
    }

    return (
        <div className="flex items-center justify-center">
            <p className="text-error absolute">{errorMessage}</p>
        </div>
    );
};

export default ErrorText;
