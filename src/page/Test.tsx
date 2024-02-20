import React, { useState, ChangeEvent } from "react";
import { db, storage } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/hooks/useAuth";
import CreatePost from "@/components/home/CreatePost";
import GetPosts from "@/components/home/getPosts";

const Test = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const { user } = useAuth();

    // 이미지 미리보기 생성
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newImages = Array.from(e.target.files || []);
        const newPreviews = await Promise.all(newImages.map(async (image) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        resolve(e.target.result.toString());
                    } else {
                        reject(new Error("Failed to read image."));
                    }
                };
                reader.readAsDataURL(image);
            });
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const handleDeleteImage = (index: number) => {
        // 이미지와 미리보기 삭제
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    const handleCreatePost = async () => {
        try {
            // 이미지를 Firebase Storage에 업로드하고 URL을 가져오기
            const imageUrls = await Promise.all(
                images.map(async (image) => {
                    const imageRef = ref(storage, `images/${user?.uid}_${image.name}`);
                    await uploadBytes(imageRef, image);
                    return getDownloadURL(imageRef);
                })
            );

            // Firestore에 게시물 추가
            await addDoc(collection(db, "posts"), {
                title,
                content,
                imageUrls,
                timestamp: new Date(),
                userId: user?.uid,
            });

            // 게시물 작성 후 필요한 로직 수행
            console.log("게시물이 성공적으로 생성되었습니다!");

            // 이미지와 미리보기 초기화
            setImages([]);
            setImagePreviews([]);
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("게시물 생성 중 오류 발생:", error);
        }
    };

    return (
        <>
            <CreatePost />
            {/* <GetPosts /> */}
        </>
    );
};

export default Test;
