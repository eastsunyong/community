import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { deleteObject, ref } from 'firebase/storage';

const GetPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                const allPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setPosts(allPosts);
            } catch (error) {
                console.error('게시물 조회 중 오류 발생:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId, imageUrls) => {
        try {
            // Firestore에서 문서 삭제
            await deleteDoc(doc(db, 'posts', postId));

            // Storage에서 이미지 삭제
            await Promise.all(imageUrls.map(async (imageUrl) => {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }));

            console.log('게시물 및 이미지가 성공적으로 삭제되었습니다!');
        } catch (error) {
            console.error('게시물 및 이미지 삭제 중 오류 발생:', error);
        }
    };

    return (
        <div className="flex flex-wrap">
            {posts.map((post) => (
                <div key={post.id} className="w-1/4 p-4">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600">{post.content}</p>
                        <div className="mt-2 flex flex-wrap">
                            {post.imageUrls.map((imageUrl, index) => (
                                <img key={index} src={imageUrl} alt={`게시물 이미지 - ${post.title}`} className="w-1/2 h-20 object-cover rounded-md mb-2" />
                            ))}
                        </div>
                        <button onClick={() => handleDelete(post.id, post.imageUrls)} className="mt-2 bg-red-500 px-4 py-2 rounded-md">삭제</button>
                        {/* 다른 정보를 표시하고 싶다면 여기에 추가 */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GetPosts;
