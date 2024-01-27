import { useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { IFormValues } from '@/interface';

export const useProfile = (watch: UseFormWatch<IFormValues>) => {
  const [previewImage, setPreviewImage] = useState('');
  const profileImg = watch('profile') as FileList | undefined;

  useEffect(() => {
    if (profileImg && profileImg.length > 0) {
      const file = profileImg[0]; // FileList에서 첫 번째 파일 가져오기
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [profileImg]);

  return { previewImage };
};
