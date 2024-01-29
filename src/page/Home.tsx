import { db, auth } from '@/firebase';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUser {
    bio: string;
    email: string;
    id: string;
    nickname: string;
    profileImage: string;
    uid: string;
}

const Home = () => {
    const [data, setData] = useState<IUser[]>([]);
    console.log(data);
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Firestore에서 모든 사용자 정보 가져오기
                const dataCollection = collection(db, 'users');
                const querySnapshot = await getDocs(dataCollection);

                // 사용자 정의 데이터 매핑 함수
                const mapData = (doc: DocumentData) => ({
                    bio: doc.data().bio,
                    email: doc.data().email,
                    id: doc.id,
                    nickname: doc.data().nickname,
                    profileImage: doc.data().profileImage,
                    uid: doc.data().uid,
                } as IUser);

                // 현재 로그인한 사용자의 UID 가져오기
                const currentUserUid = auth.currentUser?.uid;

                // 모든 사용자 정보를 가져온 후 현재 로그인한 사용자의 UID와 일치하는 정보를 필터링하여 제외
                const newData = Array.from(querySnapshot.docs, mapData).filter(user => user.uid !== currentUserUid);
                setData(newData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='w-full h-screen bg-gray'>
            {data.map((user) => (
                <div onClick={() => { nav(`/mypage/${user.uid}`) }} className='w-full h-40 border cursor-pointer border-blue-500 flex items-center px-10' key={user.uid}>
                    <img
                        className='w-24 h-24 rounded-full object-cover'
                        src={user.profileImage} />
                    <div className='flex items-center justify-between w-full px-8'>
                        <div>
                            <p>{user.nickname}</p>
                            <p>{user.bio}</p>
                        </div>
                        <div>
                            <button className='ml-auto'>팔로우</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
