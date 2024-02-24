import { useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { IFormValues } from '@/interface';

export const useProfile = (watch: UseFormWatch<IFormValues>) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const profileImgs = watch('profile') as FileList | undefined;

  useEffect(() => {
    if (profileImgs && profileImgs.length > 0) {
      const newPreviewImages = Array.from(profileImgs).map((file) => URL.createObjectURL(file));
      setPreviewImages(newPreviewImages);
    }
  }, [profileImgs]);

  return { previewImages };
};
